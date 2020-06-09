const express = require("express")
const app = express()
const mongoose = require("mongoose")
const multer = require("multer")
fs = require('fs')


mongoose.connect('mongodb://localhost/employees', { useNewUrlParser: true, useUnifiedTopology: true })
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

app.post('/users/upload', upload.single('file'), (req, res) => {

	fs.readFile(req.file.path, 'utf8', function (err,data) {
	  if (err) {
	  	res.status(500).json({result: "unsuccessful", err: "File does not exist on backend"})
	    return console.log(err)
	  }
	  let message = validate(data)
	  if (!message.isValid) {
	  	console.log(message.err)
	  	res.status(400).json({result: "unsuccessful", err: message.err})
	  }
	  else {
	  	console.log(data)
	  res.status(200).json({result: "successful"})
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
		if (!isNaN(Number(items[3])) && Number(items[3] < 0)) return {isValid: false, err: "salary is less than 0"}
		if (items[0].length === 0 || items[1].length === 0 || items[2].length === 0) return {isValid: false, err: "some fields left empty"}
	}

	if (numComments === rows.length - 1) return {isValid: false, err: "csv file has no entry of employee"}

	return {isValid: true}
}

app.listen(port, ()=> {
	console.log(`Server started on PORT ${port}`)
})