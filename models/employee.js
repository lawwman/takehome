const mongoose = require('mongoose')

var EmployeeSchema = new mongoose.Schema({
	employee_id: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minLength: [1, "empty field is not allowed"]
	},
	login: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minLength: [1, "empty field is not allowed"]
	},
	name: {
		type: String,
		required: true,
		trim: true,
		minLength: [1, "empty field is not allowed"]
	},
	salary: {
		type: Number,
		required: true,
		min: [0, 'Salary cannot be negative.'],
	}
})

module.exports = mongoose.model('employee', EmployeeSchema)