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
	    return console.log(err)
	    res.status(400).json({result: "unsuccessful"})  // for now return status 400
	  }
	  console.log(data)
	  res.status(200).json({result: "successful"})
	});
	
})

app.listen(port, ()=> {
	console.log(`Server started on PORT ${port}`)
})