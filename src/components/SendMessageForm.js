import React from 'react';

class SendMessageForm extends React.Component{
	constructor(props){
		super(props);
		// 有資料的地方就用state設定
		this.state = {
			text: ''
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	onSubmit(e) {
		e.preventDefault();
		// 呼叫App的屬性並把表單的資料傳過去
		this.props.onSubmit(this.state.text);
	}
	onChange(e){
		this.setState({
			text: e.target.value
		});
	}
	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input type="text" placeholder="請輸入登入帳號" onChange={this.onChange} />
					<input type="submit" value="登入" />
				</form>
			</div>
		);
	}
}

export default SendMessageForm;