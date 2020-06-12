const expect = require('chai').expect
const request = require('supertest')

const app = require('../../../app')
const db = require('../../../db')

const all_employees = {
  results: [
    { id: '1', login: 'test', name: 'lawrence', salary: 2.3 },
    { id: '10', login: 'test10', name: 'greenmario', salary: 2.3 },
    { id: '11', login: 'test11', name: 'aragorn', salary: 5.4 },
    { id: '12', login: 'test12', name: 'steverogers', salary: 10 },
    { id: '13', login: 'test13', name: 'tonystark', salary: 1300.4 },
    { id: '14', login: 'test14', name: 'thor', salary: 0 },
    { id: '15', login: 'test15', name: 'kyle', salary: 23.4 },
    { id: '16', login: 'test16', name: 'timothy', salary: 23.4 },
    { id: '17', login: 'test17', name: 'jon', salary: 23.4 },
    { id: '18', login: 'test18', name: 'cloud', salary: 23.4 },
    { id: '19', login: 'test19', name: 'trevorjames', salary: 2.3 },
    { id: '2', login: 'test2', name: 'jimmy', salary: 5.4 },
    { id: '20', login: 'test20', name: 'annie', salary: 5.4 },
    { id: '21', login: 'test21', name: 'abed', salary: 10 },
    { id: '22', login: 'test22', name: 'troy', salary: 23.4 },
    { id: '23', login: 'test23', name: 'pierce', salary: 23.4 },
    { id: '24', login: 'test24', name: 'jeff', salary: 223.4 },
    { id: '25', login: 'test25', name: 'britta', salary: 3.4 },
    { id: '26', login: 'test26', name: 'sherly', salary: 5.4 },
    { id: '27', login: 'test27', name: 'deanpelton', salary: 23.4 },
    { id: '28', login: 'test28', name: 'neil', salary: 2.3 },
    { id: '29', login: 'test29', name: 'shin', salary: 5.4 },
    { id: '3', login: 'test3', name: 'tom', salary: 10 },
    { id: '30', login: 'test30', name: 'monkey', salary: 10 },
    { id: '31', login: 'test31', name: 'lawman', salary: 23.4 },
    { id: '32', login: 'test32', name: 'lawboy', salary: 23.4 },
    { id: '4', login: 'test4', name: 'skywalker', salary: 23.4 },
    { id: '5', login: 'test5', name: 'gandalf', salary: 23.4 },
    { id: '6', login: 'test6', name: 'naruto', salary: 23.4 },
    { id: '7', login: 'test7', name: 'sakura', salary: 23.5 }
  ]
}

const employee_salary_lte_10 = {
  results: [
    { id: '1', login: 'test', name: 'lawrence', salary: 2.3 },
    { id: '10', login: 'test10', name: 'greenmario', salary: 2.3 },
    { id: '11', login: 'test11', name: 'aragorn', salary: 5.4 },
    { id: '12', login: 'test12', name: 'steverogers', salary: 10 },
    { id: '14', login: 'test14', name: 'thor', salary: 0 },
    { id: '19', login: 'test19', name: 'trevorjames', salary: 2.3 },
    { id: '2', login: 'test2', name: 'jimmy', salary: 5.4 },
    { id: '20', login: 'test20', name: 'annie', salary: 5.4 },
    { id: '21', login: 'test21', name: 'abed', salary: 10 },
    { id: '25', login: 'test25', name: 'britta', salary: 3.4 },
    { id: '26', login: 'test26', name: 'sherly', salary: 5.4 },
    { id: '28', login: 'test28', name: 'neil', salary: 2.3 },
    { id: '29', login: 'test29', name: 'shin', salary: 5.4 },
    { id: '3', login: 'test3', name: 'tom', salary: 10 },
    { id: '30', login: 'test30', name: 'monkey', salary: 10 }
  ]
}

const employee_salary_lte_0 = {
  "results": [
    { "id": "14", "login": "test14", "name": "thor", "salary": 0 }
  ]
}

const employee_lte_10_sort_salary = {
  results: [
    { id: '14', login: 'test14', name: 'thor', salary: 0 },
    { id: '1', login: 'test', name: 'lawrence', salary: 2.3 },
    { id: '10', login: 'test10', name: 'greenmario', salary: 2.3 },
    { id: '19', login: 'test19', name: 'trevorjames', salary: 2.3 },
    { id: '28', login: 'test28', name: 'neil', salary: 2.3 },
    { id: '25', login: 'test25', name: 'britta', salary: 3.4 },
    { id: '2', login: 'test2', name: 'jimmy', salary: 5.4 },
    { id: '11', login: 'test11', name: 'aragorn', salary: 5.4 },
    { id: '20', login: 'test20', name: 'annie', salary: 5.4 },
    { id: '26', login: 'test26', name: 'sherly', salary: 5.4 },
    { id: '29', login: 'test29', name: 'shin', salary: 5.4 },
    { id: '3', login: 'test3', name: 'tom', salary: 10 },
    { id: '12', login: 'test12', name: 'steverogers', salary: 10 },
    { id: '21', login: 'test21', name: 'abed', salary: 10 },
    { id: '30', login: 'test30', name: 'monkey', salary: 10 }
  ]
}

const employee_lte_10_sort_salary_dsc = {
  results: [
    { id: '3', login: 'test3', name: 'tom', salary: 10 },
    { id: '12', login: 'test12', name: 'steverogers', salary: 10 },
    { id: '21', login: 'test21', name: 'abed', salary: 10 },
    { id: '30', login: 'test30', name: 'monkey', salary: 10 },
    { id: '2', login: 'test2', name: 'jimmy', salary: 5.4 },
    { id: '11', login: 'test11', name: 'aragorn', salary: 5.4 },
    { id: '20', login: 'test20', name: 'annie', salary: 5.4 },
    { id: '26', login: 'test26', name: 'sherly', salary: 5.4 },
    { id: '29', login: 'test29', name: 'shin', salary: 5.4 },
    { id: '25', login: 'test25', name: 'britta', salary: 3.4 },
    { id: '1', login: 'test', name: 'lawrence', salary: 2.3 },
    { id: '10', login: 'test10', name: 'greenmario', salary: 2.3 },
    { id: '19', login: 'test19', name: 'trevorjames', salary: 2.3 },
    { id: '28', login: 'test28', name: 'neil', salary: 2.3 },
    { id: '14', login: 'test14', name: 'thor', salary: 0 }
  ]
}

const employee_lte_10_sort_login = {
  results: [
    { id: '1', login: 'test', name: 'lawrence', salary: 2.3 },
    { id: '10', login: 'test10', name: 'greenmario', salary: 2.3 },
    { id: '11', login: 'test11', name: 'aragorn', salary: 5.4 },
    { id: '12', login: 'test12', name: 'steverogers', salary: 10 },
    { id: '14', login: 'test14', name: 'thor', salary: 0 },
    { id: '19', login: 'test19', name: 'trevorjames', salary: 2.3 },
    { id: '2', login: 'test2', name: 'jimmy', salary: 5.4 },
    { id: '20', login: 'test20', name: 'annie', salary: 5.4 },
    { id: '21', login: 'test21', name: 'abed', salary: 10 },
    { id: '25', login: 'test25', name: 'britta', salary: 3.4 },
    { id: '26', login: 'test26', name: 'sherly', salary: 5.4 },
    { id: '28', login: 'test28', name: 'neil', salary: 2.3 },
    { id: '29', login: 'test29', name: 'shin', salary: 5.4 },
    { id: '3', login: 'test3', name: 'tom', salary: 10 },
    { id: '30', login: 'test30', name: 'monkey', salary: 10 }
  ]
}

const employee_lte_10_sort_login_dsc = {
  results: [
    { id: '30', login: 'test30', name: 'monkey', salary: 10 },
    { id: '3', login: 'test3', name: 'tom', salary: 10 },
    { id: '29', login: 'test29', name: 'shin', salary: 5.4 },
    { id: '28', login: 'test28', name: 'neil', salary: 2.3 },
    { id: '26', login: 'test26', name: 'sherly', salary: 5.4 },
    { id: '25', login: 'test25', name: 'britta', salary: 3.4 },
    { id: '21', login: 'test21', name: 'abed', salary: 10 },
    { id: '20', login: 'test20', name: 'annie', salary: 5.4 },
    { id: '2', login: 'test2', name: 'jimmy', salary: 5.4 },
    { id: '19', login: 'test19', name: 'trevorjames', salary: 2.3 },
    { id: '14', login: 'test14', name: 'thor', salary: 0 },
    { id: '12', login: 'test12', name: 'steverogers', salary: 10 },
    { id: '11', login: 'test11', name: 'aragorn', salary: 5.4 },
    { id: '10', login: 'test10', name: 'greenmario', salary: 2.3 },
    { id: '1', login: 'test', name: 'lawrence', salary: 2.3 }
  ]
}

const employee_lte_10_sort_name = {
  results: [
    { id: '21', login: 'test21', name: 'abed', salary: 10 },
    { id: '20', login: 'test20', name: 'annie', salary: 5.4 },
    { id: '11', login: 'test11', name: 'aragorn', salary: 5.4 },
    { id: '25', login: 'test25', name: 'britta', salary: 3.4 },
    { id: '10', login: 'test10', name: 'greenmario', salary: 2.3 },
    { id: '2', login: 'test2', name: 'jimmy', salary: 5.4 },
    { id: '1', login: 'test', name: 'lawrence', salary: 2.3 },
    { id: '30', login: 'test30', name: 'monkey', salary: 10 },
    { id: '28', login: 'test28', name: 'neil', salary: 2.3 },
    { id: '26', login: 'test26', name: 'sherly', salary: 5.4 },
    { id: '29', login: 'test29', name: 'shin', salary: 5.4 },
    { id: '12', login: 'test12', name: 'steverogers', salary: 10 },
    { id: '14', login: 'test14', name: 'thor', salary: 0 },
    { id: '3', login: 'test3', name: 'tom', salary: 10 },
    { id: '19', login: 'test19', name: 'trevorjames', salary: 2.3 }
  ]
}

const employee_lte_10_sort_name_dsc = {
  results: [
    { id: '19', login: 'test19', name: 'trevorjames', salary: 2.3 },
    { id: '3', login: 'test3', name: 'tom', salary: 10 },
    { id: '14', login: 'test14', name: 'thor', salary: 0 },
    { id: '12', login: 'test12', name: 'steverogers', salary: 10 },
    { id: '29', login: 'test29', name: 'shin', salary: 5.4 },
    { id: '26', login: 'test26', name: 'sherly', salary: 5.4 },
    { id: '28', login: 'test28', name: 'neil', salary: 2.3 },
    { id: '30', login: 'test30', name: 'monkey', salary: 10 },
    { id: '1', login: 'test', name: 'lawrence', salary: 2.3 },
    { id: '2', login: 'test2', name: 'jimmy', salary: 5.4 },
    { id: '10', login: 'test10', name: 'greenmario', salary: 2.3 },
    { id: '25', login: 'test25', name: 'britta', salary: 3.4 },
    { id: '11', login: 'test11', name: 'aragorn', salary: 5.4 },
    { id: '20', login: 'test20', name: 'annie', salary: 5.4 },
    { id: '21', login: 'test21', name: 'abed', salary: 10 }
  ]
}

const last2_employees = {
  results: [
    { id: '8', login: 'test8', name: 'sasuke', salary: 22.4 },
    { id: '9', login: 'test9', name: 'mario', salary: 23.4 }
  ]
}

describe('GET /users', () => {
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

	it('Ok, uploading csv with 32 employees', (done) => {
		request(app).post('/users/upload')
		.attach('file', './test/csv_data/large_dataset.csv')
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

	it('Ok, no params fails', (done) => {
		request(app).get('/users')
		.then((res) => {
			expect(res.text).to.equal("wrong format of request params")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, missing params fails', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '2000'})
		.then((res) => {
			expect(res.text).to.equal("wrong format of request params")
			expect(res.status).to.equal(400)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, retrieve all employees', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '2000'})
		.query({limit: '30'})
		.query({sort: ' id'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body).to.deep.equal(all_employees)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, retrieve all employees with max salary 10', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '10'})
		.query({limit: '30'})
		.query({sort: ' id'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body).to.deep.equal(employee_salary_lte_10)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, retrieve all employees with max salary 0', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '0'})
		.query({limit: '30'})
		.query({sort: ' id'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body).to.deep.equal(employee_salary_lte_0)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, retrieve all employees sort by salary ascending', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '10'})
		.query({limit: '30'})
		.query({sort: ' salary'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body).to.deep.equal(employee_lte_10_sort_salary)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, retrieve all employees sort by salary descending', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '10'})
		.query({limit: '30'})
		.query({sort: '-salary'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body).to.deep.equal(employee_lte_10_sort_salary_dsc)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, retrieve all employees sort by login ascending', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '10'})
		.query({limit: '30'})
		.query({sort: ' login'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body).to.deep.equal(employee_lte_10_sort_login)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, retrieve all employees sort by login descending', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '10'})
		.query({limit: '30'})
		.query({sort: '-login'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body).to.deep.equal(employee_lte_10_sort_login_dsc)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, retrieve all employees sort by name ascending', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '10'})
		.query({limit: '30'})
		.query({sort: ' name'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body).to.deep.equal(employee_lte_10_sort_name)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, retrieve all employees sort by name descending', (done) => {
		request(app).get('/users')
		.query({offset: '0'})
		.query({minSalary: '0'})
		.query({maxSalary: '10'})
		.query({limit: '30'})
		.query({sort: '-name'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body).to.deep.equal(employee_lte_10_sort_name_dsc)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})

	it('Ok, retrieve next page. Only 2 employees out of 32 fetched.', (done) => {
		request(app).get('/users')
		.query({offset: '30'})
		.query({minSalary: '0'})
		.query({maxSalary: '2000'})
		.query({limit: '30'})
		.query({sort: ' id'})
		.then((res) => {
			expect(res.status).to.equal(200)
			expect(res.body).to.deep.equal(last2_employees)
			done()
		})
		.catch((e) => {
			console.log("something went wrong")
			done(e)
		})
	})
})
