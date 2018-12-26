import React, { Component } from 'react';
import './App.css';
import UsernameForm from './components/UsernameForm';
import ChatScreen from './components/ChatScreen';

class App extends Component {
	constructor(){
		super();
		this.onUserSubmitted = this.onUserSubmitted.bind(this);
		this.state = {
			whereAreYou: 'usernameform'
		};
	}
	onUserSubmitted(username){
		// curl -H "Content-type: application/json" -X POST -d '{"username":"newuser"}' http://localhost:3001/users
		fetch('http://localhost:3001/users', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({username})
		}).then(()=> { 
			this.setState({
				whereAreYou : 'chatSCreen'
			})
			console.log(`${username}成功進入聊天室`)
		})
		.catch(err => { console.log('POST請求失敗')})
	}
	render() {
		if (this.state.whereAreYou === 'usernameform') {
			return (<UsernameForm onSubmit={this.onUserSubmitted} />);
		} else {
			return (<ChatScreen />)
		}
	}
}

export default App;
