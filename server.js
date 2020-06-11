const app = require('./app')
const db = require('./db')

const port = 5000

db.connect()
.then(() => {
	app.listen(port, ()=> {
		console.log(`Server started on PORT ${port}`)
	})
})

