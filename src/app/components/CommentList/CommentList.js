import React, {Component} from 'react';
import CommentItem from '../CommentItem/CommentItem';

class CommentList extends Component {
  render() {

    return (
      <div className="comm_item_container">
        <CommentItem></CommentItem>
        <CommentItem></CommentItem>
      </div>
    )
  }
}

export default CommentList;