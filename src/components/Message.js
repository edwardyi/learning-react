import React from 'react';
// 最上面的React還是要加,否則會出現解析的問題
function Message(props) {
	return(
		<div key={props.key} className="container message">
			<div className="message-username">{props.username}</div>
			<div className="message-text">{props.text}</div>
		</div>
	);
}

export default Message;