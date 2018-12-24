import React from 'react';

class SendMessageForm extends React.Component{
	constructor() {
		super();
		this.state = {
			message:''
		};
		// this.handleChange = this.handleChange.bind(this)
	}
	handleChange(e) {
		e.preventDefault();
		console.log(e.target.value);
		this.setState({
			message:e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.sendMessage(this.state.message);
		this.setState({
			message:''
		});
	}

	render() {
		return(
			<form 
				onSubmit={this.handleSubmit.bind(this)}
				className="send-message-form">
				<input 	
					onChange={this.handleChange.bind(this)}
					value={this.state.message}
					placeholder="打一些字吧" 
					type="text"
				/>
			</form>
		);
	}
}

export default SendMessageForm;