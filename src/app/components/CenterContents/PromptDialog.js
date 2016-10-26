import React, { Component, PropTypes, findDOMNode } from 'react';
import { Rate } from 'antd';
import Button from '../Button/CustomButton';
import styles from './PromptDialog.scss';

export default class PromptDialog extends Component{
  _handleClick1(e){
    if (this.props.data.btn1Click) {
      this.props.data.btn1Click(e);
    }
  }
  _handleClick2(e){
    if (this.props.data.btn2Click) {
      this.props.data.btn2Click(e);
    }
  }
  render(){
    return (
      <div className='prop-dialog'>
        <span className='head-icon'>
          <img src={this.props.data.topImg||'../../images/service.png'} />
        </span>
        <p className='rate-text'><span>{this.props.data.mainText||'这里是提示信息'}</span></p>
        <div className='button-container'>
          <div className='light-btn'>
            <Button type='light' text={this.props.data.btnText1||'取消'} onClick={this._handleClick1.bind(this)} />
          </div>
          <div className='primary-btn'>
            <Button text={this.props.data.btnText2||'确定'} onClick={this._handleClick2.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}
