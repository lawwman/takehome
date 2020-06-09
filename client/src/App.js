import React from 'react';
import './App.css';

import AddForm from './components/addForm'

class App extends React.Component {



 	render() {
	    return (
	    	<div className="container mt-4">
	      		<h1>Testing</h1>
	      		<AddForm />
	      </div>
	    );
  	}
}


export default App;
