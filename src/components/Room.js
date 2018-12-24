import React from 'react';

class Room extends React.Component{
	render(){
		return(
			<div className="rooms-list">
				<h1 className="help-text">房間列表</h1>
				<ul>
					{this.props.rooms.map((room)=> {
						console.log(room.name)
						return <li key={room.id} className="room">
							<a href="#">#{room.name}</a>
						</li>;
					})}
				</ul>
			</div>
		);
	}
}

export default Room;