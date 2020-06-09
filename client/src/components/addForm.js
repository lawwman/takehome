import React from 'react';

class AddForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {file: '', filename: 'Choose file'}
	}

	onChange = e => {
		this.setState({file: e.target.files[0], filename: e.target.files[0].name})
	}

	handleSubmit = e => {
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
				console.log(data.result)
			}).catch(() => {
				console.log("something went wrong")
			})
		}
		this.setState({file: '', filename: 'Choose file'})
	}

	render() {
		return  <form onSubmit={this.handleSubmit}>
					<div className="custom-file mb-4">
					  <input type="file" className="custom-file-input" id="customFile" onChange={this.onChange} />
					  <label className="custom-file-label" htmlFor="customFile">{this.state.filename}</label>
					</div>
					<input type="submit" value="Upload file" className="btn btn-primary btn-block mt-4" />
				</form>
	}
}

export default AddForm
