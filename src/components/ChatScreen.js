import React from 'react';
import Chatkit from '@pusher/chatkit';
import {instanceLocator} from '../config';
import MessageList from './MessageList';

class ChatScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      messages:[]
    };
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
      return currentUser.subscribeToRoom({
          roomId:19376382,
          messageLimit: 100,
          hooks:{
            onNewMessage: message => {
              this.setState({
                messages:[...this.state.messages, message]
              })
            }
          }
      });
    })
    .then(currentRoom => {
      console.log(currentRoom)
    })
    .catch((err) => {console.error('建立ChatKit失敗',err)});
  }
  render(){
    return(
      <div>
        <h3>
           Chat Begin
           <MessageList messages={this.state.messages} />
        </h3>
      </div>
    )
  }
}

export default ChatScreen;