import React, { Component } from "react";
import MessageList from './components/MessageList';
import ChatKit from '@pusher/chatkit';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';

import {tokenUrl, instanceLocator} from './config';
class App extends Component {
	constructor() {
		super();
		this.state = {
			messages:[],
			joinableRooms:[],
			joinedRooms:[] //19376382
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.getRooms = this.getRooms.bind(this);
	}
	componentDidMount() {
		const chatManager = new ChatKit.ChatManager({
			instanceLocator,
			userId:'test1',
			tokenProvider: new ChatKit.TokenProvider({
				url: tokenUrl
			})
		});
		chatManager.connect()
			.then(currentUser => {
				this.currentUser = currentUser;
				this.getRooms();
			}).catch(error => {
				console.log('API connection錯誤:',error);
			});
	}
	getRooms() {
		this.currentUser.getJoinableRooms()
			.then(joinableRooms => {
				this.setState({
					joinableRooms,
					joinedRooms: this.currentUser.rooms
				});
			}).catch(error=>{
				console.log('加入房間錯誤',error);
			});
	}
	subscribeToRoom(roomId) {
		// this.setState({messages:[]});
		this.currentUser.subscribeToRoom({
			roomId:roomId,
			// messageLimit: 20,
			hooks: {
				onNewMessage: message => {
					// console.log('message.text: ', message.text);
					this.setState({
						messages:[...this.state.messages, message]
					});
				}
			}
		});
	}
	sendMessage(text) {
		this.currentUser.sendMessage({
			text,
			roomId: 19376382//this.state.joinedRooms
		});
	}
	render() {
		// console.log(this.state.joinedRooms)
		return (
			<div className="app">
				<RoomList 
					subscribeToRoom={this.subscribeToRoom}
					rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
				/>
				<MessageList messages={this.state.messages}/>
				<SendMessageForm sendMessage={this.sendMessage} />
			</div>
		);
	}
}

export default App;
