import React, { Component, PropTypes, findDOMNode } from 'react';
import CommentItem from './NeighborCommentItem.js';
function formateDate(tm) {
  let time = new Date(Number(tm))
  let year = time.getFullYear()
  let month = (time.getMonth() + 1) > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
  let date = time.getDate() > 10 ? time.getDate() : '0' + time.getDate()
  let hour = time.getHours()
  let minute = time.getMinutes()
  let second = time.getSeconds()
  return year + "." + month + "." + date + "   " + hour + ":" + minute + ":" + second
}

export default class CommentList extends Component {
  render() {
    console.log(this.props.data)
    let commentDatas = this.props.data
    let commentList = []
    if (commentDatas && commentDatas.length > 0) {
      commentDatas.map((val, i) => {
        commentList.push({
          nickname: val.user.nickname,
          content: val.content,
          commentTime: formateDate(Number(val.date)),
        })
      })
    }
    if (commentList.length > 0) {
      return (<div style={{paddingBottom:'5rem'}}>
          {commentList.map((list, i) => {
            return <CommentItem key={i} datas={list}></CommentItem>
          }) }
        </div>
      );
    }else {
      return (<div style={{color:'#999',fontSize:'16px',lineHeight:'50px',textAlign:'center'}}>
          暂无评论
        </div>
      );
    }
  }
}