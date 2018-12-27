import React from 'react';

class WhoisOnline extends React.Component{
  render(){
    if (this.props.users) {
      return(
        <div>
          <ul>
            {this.props.users.map((user, index) => 
              (<li key={index}> {user.name} {user.presence.state}</li>))}
          </ul>
        </div>
      )
    } else {
      return (<div>載入中請稍後...</div>)
    }
    
  }
}

export default WhoisOnline;