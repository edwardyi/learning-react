import React from 'react';

class TypingHint extends React.Component{
  render(){
		const template = [
			``,
			`{a} 正在輸入中`,
			`{a} 和 {b} 正在輸入中`,
			`{a}, {b} 和 {c} 正在輸入中`,
			`{a}, {b} 等人正在輸入中`,
		];
		const idx = this.props.whoIsTyping.length;
    return(
      <div>
				{template[idx].replace(/{a}|{b}|{c}/,
						this.props.whoIsTyping[0], 
						this.props.whoIsTyping[1], 
						this.props.whoIsTyping[2])}
			</div>
    );
  }
}

export default TypingHint;