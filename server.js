const app = require('./app')
const db = require('./db')

const port = 5000

db.connect()
.then(() => {
	console.log("Connected to mongodb")
	app.listen(port, ()=> {
		console.log(`Server started on PORT ${port}`)
	})
})
.catch(() => console.log("Failed to connect to mongodb"))
