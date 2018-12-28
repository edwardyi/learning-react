import React from 'react';
import Chatkit from '@pusher/chatkit';
import {instanceLocator} from '../config';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import TypingHint from './TypingHint';
import WhoisOnline from './WhoisOnline';

class ChatScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      messages:[],
      currentUser:{},
      currentRoom:{},
      whoIsTyping:[]
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.typingMessage = this.typingMessage.bind(this);
    // this.isValidUser = false;
  }
  componentDidMount(){
    // 使用chatkit-pusher建立
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: this.props.username,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenicate'
      })
    });
    chatManager.connect()
    .then((currentUser) => {
      this.setState({
        currentUser
      })
      return currentUser.subscribeToRoom({
          roomId:19376382,
          messageLimit: 100,
          hooks:{
            onNewMessage: message => {
              this.setState({
                messages:[...this.state.messages, message]
              })
            },
            onUserStartedTyping: user => {
              console.log(user.name,'輸入中...')
              this.setState({
                whoIsTyping:[...this.state.whoIsTyping, user.name]
              })
            },
            onUserStoppedTyping: user => {
              console.log(user.name, '突然停下來,不輸入了...')
              this.setState({
                whoIsTyping: this.state.whoIsTyping.filter( 
                  username => username !== user.name
                )
              })
            },
            onUserJoined: () => {
              this.forceUpdate();
            },
            onUserLeft: () => {
              this.forceUpdate();
            },
            onPresenceChange: () =>{
              this.forceUpdate();
            }
          }
      });
    })
    .then(currentRoom => {
      this.setState({
        currentRoom
      })
    })
    .catch((err) => {console.error('建立ChatKit失敗',err)});
  }
  sendMessage(text) {
    this.state.currentUser.sendMessage({
      roomId:this.state.currentRoom.id,
      text
    });
  }
  typingMessage() {
    this.state.currentUser.isTypingIn({
      roomId: this.state.currentRoom.id
    }).catch(error => console.error('無法取得當前輸入的用戶'));
  }
  render(){
    return(
      <div style={{
        display:'flex',
        height:'100vh'
      }}>
        <div style={{
          width: '30%',
          backgroundColor: '#a5dfe9'
        }}>
          <h2>誰在線上</h2>
          <WhoisOnline users={this.state.currentRoom.users} currentUser={this.state.currentUser} />
        </div>
        <div style={{
            display:'flex',
            flexDirection:'column'
          }}>
          <div style={{
              flex:1
            }}>
              <MessageList messages={this.state.messages} />
          </div>
          <TypingHint whoIsTyping={this.state.whoIsTyping} />
          <SendMessageForm onSubmit={this.sendMessage} onChange={this.typingMessage}/>
        </div>
      </div>
    )
  }
}

export default ChatScreen;