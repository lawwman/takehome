const expect = require('chai').expect
const request = require('supertest')

const app = require('../../../app')
const db = require('../../../db')

describe('POST /users/upload', () => {
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

	it('Ok, uploading csv with single employee works', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/valid_single_entry.csv')
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

	it('Ok, uploading csv with only comments fails', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/not_valid_comment_only.csv')
		.then((res) => {
			expect(res.text).to.equal("csv file has no entry of employee")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, uploading csv with wrong salary format fails', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/not_valid_wrong_salary_format.csv')
		.then((res) => {
			expect(res.text).to.equal("csv file error, salary not a decimal")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, uploading csv with negative csv fails', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/not_valid_wrong_salary_negative.csv')
		.then((res) => {
			expect(res.text).to.equal("csv file error, salary cannot be less than zero")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, uploading csv with wrong salary format for some rows fails', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/not_valid_wrong_salary_format_some_rows.csv')
		.then((res) => {
			expect(res.text).to.equal("csv file error, salary not a decimal")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, uploading csv with only headers fail', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/not_valid_only_headers.csv')
		.then((res) => {
			expect(res.text).to.equal("csv file has no entry of employee")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, uploading empty csv fails', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/not_valid_empty.csv')
		.then((res) => {
			expect(res.text).to.equal("Empty csv file")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, uploading empty csv with too little cols fails', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/not_valid_too_few_cols.csv')
		.then((res) => {
			expect(res.text).to.equal("csv file error, employee entry has wrong number of columns")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, uploading empty csv with too many cols fails', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/not_valid_too_many_cols.csv')
		.then((res) => {
			expect(res.text).to.equal("csv file error, employee entry has wrong number of columns")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, uploading csv with some comments', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/valid_single_entry_with_comments.csv')
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

	it('Ok, uploading csv file with non-unique login fails', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/not_valid_single_entry_with_non_unique_login.csv')
		.then((res) => {
			expect(res.text).to.equal("csv file error, login is not unique")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, uploading csv file with non-unique id fails', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/not_valid_single_entry_with_non_unique_id.csv')
		.then((res) => {
			expect(res.text).to.equal("csv file error, id is not unique")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})
})
