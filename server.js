const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Employee = require('./models/employee')
const multer = require("multer")
fs = require('fs')


mongoose.connect('mongodb://localhost/employees', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log("Connected to local mongodb")).catch(() => console.log("Failed to connect to local mongodb"))

const port = 5000

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

	fs.readFile(req.file.path, 'utf8', async function (err,data) {
	  if (err) {
	  	res.status(500).json({result: "unsuccessful", err: "File does not exist on backend"})
	    return console.log(err)
	  }
	  let message = validate(data)
	  if (!message.isValid) {
	  	res.status(400).json({result: "unsuccessful", err: message.err})
	  }
	  else {
	  	console.log(data)
	  	let rows = data.split("\r\n")
	  	let badEntry = false
	  	let errorMessage = ""

	  	for (var i = 1; i < rows.length; i++) {
	  		let items = rows[i].split(",")
	  		let employee_doc = new Employee({employee_id: items[0], login: items[1], name: items[2], salary: Number(items[3])})
	  		let errors = employee_doc.validateSync()
	  		if (errors !== null) {
	  			if (errors.errors["employee_id"] != null) {
	  				errorMessage = errors.errors["employee_id"].message
		  			badEntry = true
		  			break
	  			}
	  			if (errors.errors["login"] != null) {
	  				errorMessage = errors.errors["login"].message
		  			badEntry = true
		  			break
	  			}
	  			if (errors.errors["name"] != null) {
	  				errorMessage = errors.errors["name"].message
		  			badEntry = true
		  			break
	  			}
		  		if (errors.errors["salary"] != null) {
		  			errorMessage = errors.errors["salary"].message
		  			badEntry = true
		  			break
		  		}
	  		}

	  		try {
	  			await employee_doc.save()
	  		}

	  		catch {
	  			errorMessage = "unknown error updating db"
	  			badEntry = true
	  			break
	  		}
	  	}
	  	if (badEntry) {
	  		console.log(errorMessage)
	  		res.status(400).json({result: "unsuccessful", err: errorMessage})
	  	}
	  	else {
	  		console.log("successful in updating db")
	  		res.status(200).json({result: "successful"})
	  	}
	  }
	});	
})

function validate(data) {
	if (data === "") return {isValid: false, err: "Empty csv file"}

	let rows = data.split("\r\n")
	let headers = rows[0]

	if (headers !== "id,login,name,salary") return {isValid: false, err: "csv file has wrong columns"}
	if (rows.length === 1) return {isValid: false, err: "csv file has no entry of employee"}

	let numComments = 0
	for (var i = 1; i < rows.length; i++) {
		if (rows[i].startsWith("#")) {
			numComments += 1
			continue
		}
		let items = rows[i].split(",")
		if (items.length !== 4) return {isValid: false, err: "employee entry has wrong number of columns"}
		if (!(!isNaN(Number(items[3])) && (Number(items[3]) % 1 !== 0 || items[3].endsWith(".0")))) return {isValid: false, err: "salary not a decimal"}
	}

	if (numComments === rows.length - 1) return {isValid: false, err: "csv file has no entry of employee"}

	return {isValid: true}
}

app.listen(port, ()=> {
	console.log(`Server started on PORT ${port}`)
})