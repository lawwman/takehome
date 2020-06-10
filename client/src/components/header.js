import React from 'react';

class Header extends React.Component {

	render() {
		return <div style={headerStyle}>
			<h1 style={h1Style}>Dashboard</h1>
		</div>
	}
}

const headerStyle = { 
	background: 'black',
	height: '10%',
	minHeight: '100px',
	maxHeight: '100%',
	width: '100%',
	maxWidth: '100%',
	padding: '10px'
}

const h1Style = {
	textAlign: 'center',
	color: 'AliceBlue'
}

export default Header