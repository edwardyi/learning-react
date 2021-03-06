import React from 'react';

class RoomList extends React.Component{
	render(){
		const roomOrderList = this.props.rooms.sort((a,b)=> a.id - b.id);
		return(
			<div className="rooms-list">
				<ul>
					<h3>房間列表</h3>
					{roomOrderList.map((room)=> {
    				const activeRoom = this.props.roomId === room.id ? 'active' : '';
						return <li key={room.id} className={"room " + activeRoom}>
							<a 
								onClick={()=>this.props.subscribeToRoom(room.id)} 
								href="#">
								#{room.name}
							</a>
						</li>;
					})}
				</ul>
			</div>
		);
	}
}

export default RoomList;