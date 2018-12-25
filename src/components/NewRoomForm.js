import React from 'react';

class NewRoomFrom extends React.Component{
	constructor(){
		super();
		this.state = {
			roomName:''
		};
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.createNewRoom(this.state.roomName);
	}
	handleInput(e){
		this.setState({
			roomName:e.target.value
		});
	}
	render(){
		return(
			<div className="new-room-form">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input onChange={this.handleInput.bind(this)} 
						value={this.state.roomName}
						placeholder="請輸入聊天室名稱"
						required/>
					<button id="create-room-btn" type="submit">+</button>
				</form>
			</div>
		);
	}
}

export default NewRoomFrom;