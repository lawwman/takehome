import React from 'react';
import './App.css';

import AddForm from './components/addForm'
import Header from './components/header'
import EmployeeList from './components/employeeList'

class App extends React.Component {

	constructor(props) {
	    super(props)
	    this.state = {list: []}
	}

	componentDidMount() {
		this.updateEmployeeList()
	}

	updateEmployeeList = () => {
		fetch('/users', {
			method: "GET"
		}).then((res) => res.json()).then(data => {
			if (data.result === "successful") {
				this.setState({list: data.employees})
			}
			else console.log("unsucessful get request")
		}).catch(() => {
			console.log("Error fetching")
		})
	}

 	render() {
	    return (
	    	<>
	    	<Header />
	    	<div className="container mt-4">
	      		<AddForm updateList={this.updateEmployeeList} />
	      		<EmployeeList list={this.state.list} />
	      </div>
	      </>
	    );
  	}
}


export default App;
