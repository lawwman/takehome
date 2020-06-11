import React from 'react'

class EmployeeCard extends React.Component {

	constructor(props) {
	    super(props)
	    this.state = {edit: false, login: this.props.info.login, name: this.props.info.name, salary: this.props.info.salary, message: ""}
	}

	editButton = () => {
		this.setState({edit: !this.state.edit})
	}

	updateEmployee = (e) => {
		e.preventDefault()
		// do some kind of validation
		if (this.state.login.length === 0) this.setState({message: "login cannot be blank"})
		else if (this.state.name.length === 0) this.setState({message: "name cannot be blank"})
		else if (isNaN(Number(this.state.salary))) this.setState({message: "salary must be a number"})
		else if (!(Number(this.state.salary) % 1 !== 0 || this.state.salary.endsWith(".0"))) this.setState({message: "salary must be decimal"})
		else if (Number(this.state.salary) < 0) this.setState({message: "salary must be positive number"})
		else this.props.updateEmployee(this.props.info.id, this.state.login, this.state.name, this.state.salary)
	}

	deleteEmployee = () => {
		let deleteUser = window.confirm("Are you sure you want to delete the user")
		if (deleteUser) this.props.deleteEmployee(this.props.info.id)
	}

	onChangeLogin = e => {
		this.setState({login: e.target.value})
	}

	onChangeName = e => {
		this.setState({name: e.target.value})
	}

	onChangeSalary = e => {
		this.setState({salary: e.target.value})
	}

	render() {
		let editForm = <div></div>
		if (this.state.edit) editForm = <React.Fragment>
			<form style={{padding: '20px'}} onSubmit={this.updateEmployee}>
				<div className="form-row">
					<div className="form-group col-sm-2">
				    	<label htmlFor="loginid">Login</label>
				    	<input type="text" className="form-control" id="loginid" value={this.state.login} onChange={this.onChangeLogin} />
				    </div>
				    <div className="form-group col-sm-2">
				    	<label htmlFor="name">Name</label>
				    	<input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onChangeName} />
				    </div>
				    <div className="form-group col-sm-3">
				    	<label htmlFor="salary">Salary</label>
				    	<input type="text" className="form-control" id="salary" value={this.state.salary} onChange={this.onChangeSalary} />
				    </div>
				</div>
				<button type="button" className="btn btn-secondary" onClick={this.editButton}>Cancel</button>
				<span style={errorMessageFontStyle}>{this.state.message}</span>
				<input type="submit" value="Edit" className="btn btn-primary btn-block mt-4 col-sm-2" />
			</form>
		</React.Fragment>

		return <div className="card text-white bg-dark mb-3">
			  <div className="card-body">
				<span className="card-title" style={labelStyle}>{this.props.info.id}</span>
			  	<span className="card-title" style={labelStyle}>Login: </span>
			  	<span className="card-title">{this.props.info.login}, </span>
			  	<span className="card-title" style={labelStyle}>Name: </span>
			  	<span className="card-title">{this.props.info.name}, </span>
			  	<span className="card-title" style={labelStyle}>Salary: </span>
			  	<span className="card-title">${this.props.info.salary}</span>
			  	<button type="button" className="btn btn-primary ml-4" onClick={this.editButton}>Edit</button>
				<button type="button" className="btn btn-danger ml-1" onClick={this.deleteEmployee}>Delete</button>
			  </div>
			  {editForm}
			</div>
	}
}

const labelStyle = {
	color: "#5389ed",
	fontStyle: "italic",
	marginLeft: '15px'
}

const errorMessageFontStyle = {
	color: "red",
	marginLeft: '15px'
}


export default EmployeeCard