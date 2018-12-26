import React from 'react';

class MessageList extends React.Component{
  render(){
    return (
      <div>
        <ul>
          {this.props.messages.map((message, index) => 
            (<li key={index}>
                <div>
                  <span>{message.senderId}</span>
                  <span>{message.text}</span>
                </div>
              </li>)
          )}
        </ul>
      </div>
    );
  }
}

export default MessageList;