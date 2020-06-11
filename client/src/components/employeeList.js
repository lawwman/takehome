import React from 'react'

import EmployeeCard from './employeeCard'


class EmployeeList extends React.Component {

	render() {

		const cards = this.props.list.map((item, idx) => <EmployeeCard key={item.id} info={item} updateEmployee={this.props.updateEmployee} />)

		return <div className="mt-4">
			<h1 className="mb-4">Employee List</h1>
			{cards}
		</div>
	}

}

export default EmployeeList