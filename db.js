const mongoose = require("mongoose")

function connect() {
	return new Promise((resolve, reject) => {

		mongoose.connect('mongodb://localhost/employees', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
		.then((res, err) => {
			if (err) return reject(err)
			resolve()
		})
	})
}

function close() {
	return mongoose.disconnect()
}


module.exports = { connect, close }

