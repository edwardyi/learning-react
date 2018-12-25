import React, { Component } from "react";
import MessageList from './components/MessageList';
import ChatKit from '@pusher/chatkit';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import TypingIndicator from './components/TypingIndicator';

import {tokenUrl, instanceLocator} from './config';
class App extends Component {
	constructor() {
		super();
		this.state = {
			roomId:null,
			messages:[],
			joinableRooms:[],
			joinedRooms:[], //19376382
			whosTyping:[]
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.subscribeToRoom = this.subscribeToRoom.bind(this);
		this.getRooms = this.getRooms.bind(this);
		this.typing = this.typing.bind(this);
	}
	componentDidMount() {
		const chatManager = new ChatKit.ChatManager({
			instanceLocator,
			userId:'test2',
			tokenProvider: new ChatKit.TokenProvider({
				url: tokenUrl
			})
		});
		chatManager.connect()
			.then(currentUser => {
				this.currentUser = currentUser;
				console.log(this.currentUser.rooms[0].users)
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
		this.setState({messages:[]});
		this.currentUser.subscribeToRoom({
			roomId:roomId,
			// messageLimit: 20,
			hooks: {
				onNewMessage: message => {
					// console.log('message.text: ', message.text);
					this.setState({
						messages:[...this.state.messages, message]
					});
				},
				onUserStartedTyping: user => {
					this.setState({
						whosTyping:[...this.state.whosTyping, user.name]
					});
					// console.log(`${user.name}正在輸入中`);
				},
				onUserStoppedTyping: user => {
					this.setState({
						whosTyping: this.state.whosTyping.filter(
							username => username !== user.name
						),
					});
				},
			}
		}).then(room=>{
			this.setState({
				roomId:room.id
			});
			// 再重新取得一次有哪些聊天室可以用
			this.getRooms();
		}).catch(err => console.log('聊天室開啟錯誤', err, roomId,"roomIdTeset"));
	}
	sendMessage(text) {
		this.currentUser.sendMessage({
			text,
			roomId: this.state.roomId//this.state.joinedRooms
		});
	}
	typing() {
		this.currentUser.isTypingIn({roomId:this.state.roomId}).catch(err=>{console.log('取得正在輸入使用者輸入錯誤',err);})
		console.log('typing is calling',this.state.whosTyping)
	}
	createNewRoom(name){
		// console.log(name)
		// 如果建立成功就切換到新的聊天室
		this.currentUser.createRoom({
			name
		}).then(room => this.subscribeToRoom(room.id))
			.catch(err=>console.log('建立聊天室失敗',err));
	}
	render() {
		// console.log(this.state.joinedRooms)
		return (
			<div className="app">
				<RoomList 
				  roomId={this.state.roomId}
					subscribeToRoom={this.subscribeToRoom}
					rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
				/>
				<MessageList roomId={this.state.roomId} messages={this.state.messages}/>
				<TypingIndicator typingUsers={this.state.whosTyping} />
				<SendMessageForm roomId={this.state.roomId} onSubmit={this.sendMessage} onChange={this.typing} />
				<NewRoomForm createNewRoom={this.createNewRoom.bind(this)} />
			</div>
		);
	}
}

export default App;
