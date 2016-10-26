import React, { Component, PropTypes, findDOMNode } from 'react';
import {message } from 'antd';
import Button from '../Button/CustomButton'
import './AddComment.scss';

export default class AddComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      period: 'new',
    };
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(e) {
    if (e.target.innerHTML.indexOf('取消') >= 0) {
      this.props.parentCallback('close')
    } else {
      let text = document.getElementById('serviceAddComment').value.trim()
      if (text.length < 6) {
        message.info('评论不能少于6个字！')
        return
      }
      this.props.parentCallback('publish', text)
    }
  }

  render() {
    return (
      <div className='add-comment-area'>
        <ul className='add-comment-head'>
          <li className='cancle-btn' onClick={this._handleClick.bind(this)}>取消</li>
          <li className='title'> {this.props.text} </li>
          <li className='publish'><Button onClick={this._handleClick.bind(this)} type='primary'>发表</Button></li>
        </ul>
        <div className="textarea">
          <textarea rows='6' id="serviceAddComment" placeholder='你的点评对我们十分重要...'></textarea>
        </div>
      </div>
    );
  }
}
 