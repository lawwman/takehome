import React from 'react'

class EmployeeCard extends React.Component {

	render() {
		return <div className="card text-white bg-dark mb-3">
			  <div className="card-body">

			  	<span className="card-title" style={indexStyle}>[{this.props.index}]</span>
			  	<span className="card-title" style={labelStyle}>Login: </span>
			  	<span className="card-title">{this.props.info.login}, </span>
			  	<span className="card-title" style={labelStyle}>Name: </span>
			  	<span className="card-title">{this.props.info.name}, </span>
			  	<span className="card-title" style={labelStyle}>Salary: </span>
			  	<span className="card-title">${this.props.info.salary}</span>
			  	<button type="button" className="btn btn-primary ml-4">Edit</button>
				<button type="button" className="btn btn-secondary ml-1">Delete</button>
			  </div>
			</div>
	}
}

const indexStyle = {
	color: "orange",
	marginRight: '10px'
}

const labelStyle = {
	color: "#5389ed",
	fontStyle: "italic",
	marginLeft: '15px'
}


export default EmployeeCard