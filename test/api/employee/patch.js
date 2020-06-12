const expect = require('chai').expect
const request = require('supertest')

const app = require('../../../app')
const db = require('../../../db')


describe('PATCH /users/:id', () => {
	before((done) => {
		db.connect().then(() => done())
		.catch((err) => {
			console.log("Error setting up DB")
			done(err)
		})
	})
	after((done) => {
		db.close().then(() => {
			done()})
		.catch((err) => done(err))
	})

	it('First. Clear database before testing begins', (done) => {
		request(app).delete('/clearAllUsers').then(res => {
			console.log(res.text)
			done()
		})
	})

	it('Ok, uploading csv with 8 employees', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/small_dataset.csv')
		.then((res) => {
			expect(res.text).to.equal("Successful in updating db.")
			expect(res.status).to.equal(200)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, change annie login from test20 to edison', (done) => {
		request(app).patch(`/users/20`)
		.set('Content-Type', 'application/json')
    	.send('{"id":"20","login":"edison","name":"annie","salary":"5.4"}')
		.then((res) => {
			expect(res.text).to.equal("updated employee")
			expect(res.status).to.equal(200)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, change abed login from test21 to edison fails', (done) => {
		request(app).patch(`/users/21`)
		.set('Content-Type', 'application/json')
    	.send('{"id":"21","login":"edison","name":"abed","salary":"10.0"}')
		.then((res) => {
			expect(res.text).to.equal("login has to be unique")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, change abed login from test21 to nadir works', (done) => {
		request(app).patch(`/users/21`)
		.set('Content-Type', 'application/json')
    	.send('{"id":"21","login":"nadir","name":"abed","salary":"10.0"}')
		.then((res) => {
			expect(res.text).to.equal("updated employee")
			expect(res.status).to.equal(200)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, delete employee with id 21', (done) => {
		request(app).delete(`/users/21`)
		.then((res) => {
			expect(res.text).to.equal("deleted employee")
			expect(res.status).to.equal(200)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, fetch all employees. Only should have 7 left', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '2000'})
		.query({limit: '30'})
		.query({sort: ' id'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body.results.length).to.equal(7)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})
})
