import React from 'react';
import WhoisOnlineItem from './WhoisOnlineItem';

class WhoisOnline extends React.Component{
  render(){
    if (this.props.users) {
      const currentUserId = this.props.currentUser.id;
      return(
        <div>
          <ul>
            {
              this.props.users.map((user, index) => 
              (
                <WhoisOnlineItem key={index} user={user}>
                {user.name}
                {currentUserId === user.id ? '<=(上電視囉)' : ''}
                </WhoisOnlineItem>
              ))
              }
          </ul>
        </div>
      )
    } else {
      return (<div>載入中請稍後...</div>)
    }
    
  }
}

export default WhoisOnline;