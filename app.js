const express = require("express")
const app = express()

const Employee = require('./models/employee')
const multer = require("multer")
fs = require('fs')

let processing = false

app.use(express.urlencoded({ extended:true }))
app.use(express.json())

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/')
	},
	filename: function(req, file, cb) {
		let date = new Date().toISOString()
		date = date.replace(/:/g, '-')  // windows does not accept ":" as part of file name
		cb(null, file.fieldname + '-' + date)
	}
})

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'text/csv') cb(null, true)
	else cb(null, false)
}

let upload = multer({storage: storage, fileFilter: fileFilter})

app.post('/users/upload', upload.single('file'), async (req, res) => {
	if (!processing) {
		processing = true
		fs.readFile(req.file.path, 'utf8', async function (err,data) {
			if (err) {
				processing = false
				res.status(500).send("Server failed to receive CSV file.")
				return console.log(err)
				}
				let message = await validateCSV(data)
				if (!message.isValid) {
					processing = false
					res.status(400).send(message.err)
				}
				else {
					console.log(data)
					let rows = data.split("\r\n")
					try {
					for (var i = 1; i < rows.length; i++) {
				  		let items = rows[i].split(",")
				  		const employees = await Employee.find({id: items[0]})
				  		if (employees.length === 0) {
				  			let employee_doc = new Employee({id: items[0], login: items[1], name: items[2], salary: Number(items[3])})
				  			await employee_doc.save()
				  		}
				  		else {
				  			await Employee.updateOne({id: items[0]}, {login: items[1], name: items[2], salary: Number(items[3])})
				  		}
				  	}
				  	processing = false
				  	console.log("successful in updating db")
					res.status(200).send("Successful in updating db.")
					}
					catch (e) {
						processing = false
						console.log("unknown error updating db")
						res.status(400).send("failed in updating db.")
					}
				}
			});	
	}
	else res.status(400).send("no concurrent uploads allowed.")
	
})

app.get('/users', async (req, res) => {
	try {
		if (isNaN(Number(req.query.minSalary)) || isNaN(Number(req.query.maxSalary)) || isNaN(Number(req.query.limit)) || isNaN(Number(req.query.offset))) {
			res.status(400).send("wrong format of request params")
		}

		else if (!req.query.sort.startsWith("-") && !req.query.sort.startsWith(" ") || (req.query.sort.substring(1) !== "id" && req.query.sort.substring(1) !== "login" && req.query.sort.substring(1) !== "name" && req.query.sort.substring(1) !== "salary")) {
			res.status(400).send("sort field not formated properly")
		}

		else {
			let offset = Number(req.query.offset)
			let minS = Number(req.query.minSalary)
			let maxS = Number(req.query.maxSalary)
			let limit = Number(req.query.limit)
			let sort = req.query.sort
			let count = await Employee.countDocuments({salary: {$gte: minS, $lte: maxS}})
			if (offset > count) {
				res.status(200).json({results: []})
			}
			else {
				let employees = await Employee.find({salary: {$gte: minS, $lte: maxS}}).sort(sort).skip(offset).limit(limit).select("id login name salary -_id")
				res.status(200).json({results: employees})
			}
		}
	}
	catch {
		res.status(400).send("missing request params")
	}
})

app.patch('/users/:id', async (req, res) => {
	let id = req.params.id
	try {
		// check if new login is unique in db
		let employees = await Employee.find({name: req.body.name})
		if (employees.length === 0) {
			await Employee.updateOne({id: id}, {login: req.body.login, name: req.body.name, salary: Number(req.body.salary)})	
			res.status(200).send("updated employee")
		}
		else {
			// if login is not unique, then check if it belongs to same id (same person)
			if (employees[0].id === id) {
				await Employee.updateOne({id: id}, {login: req.body.login, name: req.body.name, salary: Number(req.body.salary)})
				res.status(200).send("updated employee")
			}
			else res.status(400).send("login has to be unique")
		}
	}
	catch {
		res.status(400).send("failed to update employee")
	}
		
})

app.delete('/users/:id', async (req, res) => {
	let id = req.params.id
	try {
		await Employee.deleteOne({id:id})
		res.status(200).send("deleted employee")
	}
	catch {
		res.status(400).send("failed to delete employee")
	}
})


async function validateCSV(data) {
	if (data === "") return {isValid: false, err: "Empty csv file"}

	let rows = data.split("\r\n")
	let headers = rows[0]

	if (headers !== "id,login,name,salary") return {isValid: false, err: "csv file has wrong columns"}
	if (rows.length === 1) return {isValid: false, err: "csv file has no entry of employee"}

	let numComments = 0
	let login_list = []
	let id_list = []

	for (var i = 1; i < rows.length; i++) {
		if (rows[i].startsWith("#")) {
			numComments += 1
			continue
		}
		let items = rows[i].split(",")
		if (items.length !== 4) return {isValid: false, err: "csv file error, employee entry has wrong number of columns"}
		// check if salary is of a correct format
		if (isNaN(Number(items[3]))) return {isValid: false, err: "csv file error, salary has to be a decimal value"}
		if (!(Number(items[3]) % 1 !== 0 || items[3].endsWith(".0"))) return {isValid: false, err: "csv file error, salary not a decimal"}
		if (Number(items[3]) < 0) return {isValid: false, err: "csv file error, salary cannot be less than zero"}

		// check if id, name and login are non-empty strings or blank characters
		if (items[0].trim().length === 0) return {isValid: false, err: "csv file error, id is blank"}
		if (items[1].trim().length === 0) return {isValid: false, err: "csv file error, login is blank"}
		if (items[2].trim().length === 0) return {isValid: false, err: "csv file error, name is blank"}

		// check for uniqueness of login and id
		if (id_list.includes(items[0])) return {isValid: false, err: "csv file error, id is not unique"}
		id_list.push(items[0])
		if (login_list.includes(items[1])) return {isValid: false, err: "csv file error, login is not unique"}
		login_list.push(items[1])

		// check for uniqueness of login within db
		const employees = await Employee.find({login: items[1]}) // Only query 1 document from collection.
		if (employees.length != 0) {
			if (employees[0].id !== items[0])
				return {isValid: false, err: "csv file error, login already exists in the database."}
		}
	}

	if (numComments === rows.length - 1) return {isValid: false, err: "csv file has no entry of employee"}
	return {isValid: true}
}

module.exports = app