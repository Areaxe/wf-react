import React, { Component, PropTypes, findDOMNode } from 'react';
import { Rate, message } from 'antd';
import Button from '../Button/CustomButton';
import './CommentArea.scss';
import iconImg from '../../images/comment_title.png'

export default class CommentArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showComment: false,
      value: 0,
    }
    this._handleChange = this._handleChange.bind(this)
    this._handleLater = this._handleLater.bind(this)
    this._handleComplete = this._handleComplete.bind(this)
  }

  _handleChange(value) {
    this.setState({
      value: value,
    })
  }

  _handleLater() {
    this.props.parentCallback('later')
  }

  _handleComplete() {
    if(this.state.value === 0) {
      message.info('请为此服务评星级！')
      return
    }
    let text = document.getElementById('serviceComment').value.trim()
    if(text.length < 6) {
      message.info('评论不能少于6个字！')
      return
    }
    this.props.parentCallback('complete', text, this.state.value)
  }

  render() {
    return (
      <div className='comment-area'>
        <span className='head-icon'>
          <img src={iconImg}/>
        </span>
        <p className='rate-text'>请为我们的服务评分，谢谢！</p>
        <div className='Rate'>
          <Rate onChange={this._handleChange} allowHalf value={this.state.value}/>
        </div>
        <textarea id="serviceComment" placeholder='评价...'></textarea>
        <div className='button-container'>
          <div className='light-btn'>
            <Button onClick={this._handleLater} type='light' text='稍后再说'/>
          </div>
          <div className='primary-btn'>
            <Button onClick={this._handleComplete} text='完成'/>
          </div>
        </div>
      </div>
    );
  }
}