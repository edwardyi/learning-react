import React from 'react';
import Chatkit from '@pusher/chatkit';
import {instanceLocator} from '../config'

class ChatScreen extends React.Component{
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
    .then((currentUser) => {console.log('成功建立Chatkit',currentUser)})
    .catch((err) => {console.error('建立ChatKit失敗',err)});
  }
  render(){
    return(
      <div>
        <h3>
           Chat Begin
        </h3>
      </div>
    )
  }
}

export default ChatScreen;