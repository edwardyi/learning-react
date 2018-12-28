import React from 'react';

class WhoisOnlineItem extends React.Component{
  render(){
    const style = {
      li:{
        display:'flex',
        paddingTop:'5px',
        paddingBottom:'5px',
        paddingRight:'2px',
        paddingLeft:'2px'
      },
      div:{
        borderRadius: '50%',
        width:'11px',
        height:'11px',
        backgroundColor: this.props.user.presence.state === 'online' ? 'green' : '#081408',
        marginTop:'8px',
        marginRight:'9px'
      }
    }
    return(
      <li style={style.li} key={this.props.key}>
        <div style={style.div} ></div>
        {this.props.children}
      </li>
    )
  }
}

export default WhoisOnlineItem;