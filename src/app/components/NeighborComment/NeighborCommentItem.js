import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './NeighborCommentItem.scss';
export default class CommentItem extends Component {
  render(){
    return(
      <div className='comment-item' >
          <div className="comment-info">
            <p className="nickname">{this.props.datas.nickname}</p>
            <p className="comment-time">{this.props.datas.commentTime}</p>
          </div>
          <div className="comment-content">{this.props.datas.content}</div>
      </div>
      )
  }
}