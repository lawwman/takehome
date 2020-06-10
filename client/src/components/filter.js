import React from 'react'

class Filter extends React.Component {

	onSubmit = (e) => {
		e.preventDefault()
		this.props.updateList()
	}

	setMinSalary = e => {
		this.props.setMinSalary(e.target.value)
	}

	setMaxSalary = e => {
		this.props.setMaxSalary(e.target.value)
	}

	setOffset = e => {
		this.props.setOffset(e.target.value)
	}

	onId = () => {
		this.props.toggleSort("id")
	}

	onLogin = () => {
		this.props.toggleSort("login")
	}

	onName = () => {
		this.props.toggleSort("name")
	}

	onSalary = () => {
		this.props.toggleSort("salary")
	}


	render() {
		let ascending = "ASC"
		if (!this.props.ascending) ascending = "DSC"
		let idClass = "btn btn-secondary"
		let loginClass = "btn btn-secondary ml-1"
		let nameClass = "btn btn-secondary ml-1"
		let salaryClass = "btn btn-secondary ml-1"

		if (this.props.sort === "id") idClass = "btn btn-primary"
		else if (this.props.sort === "login") loginClass = "btn btn-primary ml-1"
		else if (this.props.sort === "name") nameClass = "btn btn-primary ml-1"
		else if (this.props.sort === "salary") salaryClass = "btn btn-primary ml-1"


		return <form onSubmit={this.onSubmit}>
			<h3>Filter Employees</h3>
			<div className="form-row">
				<div className="form-group col-md-4">
			    	<label htmlFor="minSalary">Min Salary</label>
			    	<input onChange={this.setMinSalary} value={this.props.minS} type="number" className="form-control" id="minSalary" placeholder="0" min="0" />
			    </div>
			    <div className="form-group col-md-4">
			    	<label htmlFor="maxSalary">Max Salary</label>
			    	<input onChange={this.setMaxSalary} value={this.props.maxS} type="number" className="form-control" id="maxSalary" placeholder="no limit" min="0" />
			    </div>
			    <div className="form-group col-md-4">
			    	<label htmlFor="pages">Page</label>
			    	<input onChange={this.setOffset} value={this.props.offset} type="number" className="form-control" id="pages" placeholder="page number.." min="0" />
			    </div>
			</div>
			<button type="button" className={idClass} onClick={this.onId}>Id - {ascending}</button>
			<button type="button" className={loginClass} onClick={this.onLogin}>Login - {ascending}</button>
			<button type="button" className={nameClass} onClick={this.onName}>Name - {ascending}</button>
			<button type="button" className={salaryClass} onClick={this.onSalary}>Salary - {ascending}</button>
			<input type="submit" value="Filter" className="btn btn-primary btn-block mt-4 col-sm-2" />
		</form>
	}

}

export default Filter