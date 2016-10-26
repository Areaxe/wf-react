import React, { Component, PropTypes, findDOMNode } from 'react';
import Button from '../Button/CustomButton';
import styles from './Call.scss';

export default class CommentArea extends Component{
	_cancleHandle(e){
		this.props.cancleCall(e);
	}
	_callPhone(e){
		this.props.callPhone(e)
	}
	render(){
		return (
			<div className='call-shade'>
				<div className='pri-btn'><Button type='primary' text='拨打电话' onClick={this._callPhone.bind(this)} /></div>
				<Button type='light-blue' text='取 消' onClick={this._cancleHandle.bind(this)} />
			</div>
			);
	}
}
 