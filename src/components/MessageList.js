import React from 'react';
// import DUMMY_DATA from '../data/test';
import ReactDOM from 'react-dom';
import Message from './Message';

class MessageList extends React.Component {
	componentWillUpdate() {
		const node = ReactDOM.findDOMNode(this);
		this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
	}
	componentDidUpdate() {
		if (this.shouldScrollToBottom) {
			const node = ReactDOM.findDOMNode(this);
			node.scrollTop = node.scrollHeight;
		}
	}
	render() {
		if (!this.props.roomId) {
			
			return (
				<div className="message-list">
					<div className="join-room">
						&larr;請選擇聊天室!!
					</div>
				</div>
			);
		}
		return(
			<div className="message-list">
				{this.props.messages.map((message, index)  => {
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