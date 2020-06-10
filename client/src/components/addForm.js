import React from 'react';

class AddForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {file: '', filename: 'Choose csv file to upload..'}
	}

	onChange = e => {
		console.log(`File: ${e.target.files[0]} and Filename: ${e.target.files[0].name}`)
		this.setState({file: e.target.files[0], filename: e.target.files[0].name})
	}

	handleSubmit = async e => {
		e.preventDefault()

		if (this.state.filename !== "" && this.state.filename.endsWith(".csv")) {
			const formData  = new FormData();

			var blob = new Blob([this.state.file], {type: "text/csv"});

			formData.append("file", blob, this.state.filename)

			fetch('./users/upload', {
			method: 'POST',
			body: formData
			}).then(res => {
				return res.json()
			}).then(data => {
				if (data.result === "successful") {
					console.log(data.result)
					this.props.updateList()
				}
				else console.log(data.err)
			}).catch(() => {
				console.log("something went wrong")
			})
		}
	}

	render() {
		return  <form onSubmit={this.handleSubmit}>
					<div className="custom-file">
					  <input type="file" className="custom-file-input" id="customFile" onChange={this.onChange} />
					  <label className="custom-file-label" htmlFor="customFile">{this.state.filename}</label>
					</div>
					<input type="submit" value="Upload file" className="btn btn-primary btn-block mt-4" />
				</form>
	}
}

export default AddForm
