const mongoose = require('mongoose')

var EmployeeSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	login: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	salary: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('employee', EmployeeSchema)