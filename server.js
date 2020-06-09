const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/employees', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to local mongodb")).catch(() => console.log("Failed to connect to local mongodb"))

const port = 5000

app.listen(port, ()=> {
	console.log(`Server started on PORT ${port}`)
})