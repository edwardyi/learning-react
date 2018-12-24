import React from 'react';
// import DUMMY_DATA from '../data/test';
import Message from './Message';

class MessageList extends React.Component {
	render() {
		return(
			<div className="message-list">
				{this.props.message.map((message, index)  => {
					// console.log(message)
					return (
						<Message username={message.senderId} key={index} text={message.text} />
					);
				})}
			</div>
		);
	}
}

export default MessageList;