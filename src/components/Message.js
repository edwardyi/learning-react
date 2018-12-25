import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';

// 最上面的React還是要加,否則會出現解析的問題
function Message(props) {
	return(
		<div key={props.key} className="container message">
			<div className="message-username">
				<Avatar className={deepOrange} alt={props.username}>
					{props.username.charAt(0).toUpperCase()}
				</Avatar>
			</div>
			<div className="message-text">{props.text}</div>
		</div>
	);
}

export default Message;