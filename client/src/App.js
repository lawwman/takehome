import React from 'react';
import './App.css';

import AddForm from './components/addForm'
import Header from './components/header'
import Filter from './components/filter'
import EmployeeList from './components/employeeList'

class App extends React.Component {

	constructor(props) {
	    super(props)
	    this.state = {list: [], offset: 0, minS: 0, maxS: 2000, sort: 'id', ascending: true}
	}

	componentDidMount() {
		this.updateEmployeeList()
	}

	updateEmployeeList = () => {
		let order = "+"
		if (!this.state.ascending) order = "-"
		let sort = order + this.state.sort
		fetch(`/users?limit=30&minSalary=${this.state.minS}&maxSalary=${this.state.maxS}&offset=${this.state.offset * 30}&sort=${sort}`, {
			method: "GET"
		})
		.then(async (res) => {
			if (res.status === 200) {
				let data = await res.json()
				this.setState({list: data.results})
			}
			else {
				let message = await res.text()
				console.log(message)
			}
		})
		.catch(() => console.log("error fetching")) 
	}

	updateEmployee = (id, login, name, salary) => {
		fetch(`/users/${id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({login: login, name: name, salary: salary})
      }).then(async res => {
      	if (res.status === 200) {
      		this.updateEmployeeList()
      	}
      	else {
      		let message = await res.text()
			console.log(message)
      	}
      })
      .catch(() => console.log("error updating"))
	}

	toggleSort = (category) => {
		if (category === this.state.sort)
			this.setState({ascending: !this.state.ascending})
		else this.setState({sort: category})
	}

	setMinSalary = minS => {
		this.setState({minS: minS})
	}

	setMaxSalary = maxS => {
		this.setState({maxS: maxS})
	}

	setOffset = offset => {
		this.setState({offset: offset})
	}

 	render() {
	    return (
	    	<>
	    	<Header />
	    	<div className="container mt-4">
	      		<AddForm updateList={this.updateEmployeeList} />
	      		<Filter sort={this.state.sort} ascending={this.state.ascending} toggleSort={this.toggleSort}
	      		setMinSalary={this.setMinSalary} setMaxSalary={this.setMaxSalary} setOffset={this.setOffset}
	      		minS={this.state.minS} maxS={this.state.maxS} offset={this.state.offset} updateList={this.updateEmployeeList} />

	      		<EmployeeList list={this.state.list} updateEmployee={this.updateEmployee} />
	      </div>
	      </>
	    );
  	}
}


export default App;
