import React, {Component} from 'react';
import './CommentItem.scss';
import {Rate} from 'antd';

import tel_64 from '../../images/tel@3x.png';

function  formateDate(timeStamp) {
    let date = new Date(Number(timeStamp))
    let month = date.getMonth()>=9?(date.getMonth()+1):'0'+(date.getMonth()+1)
    let day = date.getDate()>10?date.getDate():('0'+date.getDate())
    return month + '-' + day
  }
class CommentItem extends Component {

  render() {
    let commentItem = this.props.data
    let subCommentList = []
    let subComments = commentItem.comments
    let comment = ''

    //如果没有追加评价或者追加评价数量为0
    if (subComments && subComments.length) {
      for (let subComment of subComments) { //追加点评列表获取
        let subCommentDate = formateDate(subComment.date);
        subCommentList.push({
          subContent: subComment.content,
          subContentTime: subCommentDate,
          subUserName: subComment.user.nickname,
          subUserLogo: subComment.user.headimgurl,
          isMerchant: subComment.isMerchant,
        })
      }
    }
    let commentdate = formateDate(commentItem.date);
    comment = {
      userLogo: commentItem.user.headimgurl,
      userName: commentItem.user.nickname,
      commentContent: commentItem.content,
      commentDate: commentdate,
      star: commentItem.starNum,
    }
    let merchantText = '' //商家回复
    let userSubText = ''  //用户追加评论
    let merchantSubText= '' //商家追加回复
    let addCommentText = '' //追加评论板块
    if (subCommentList.length) {
    subCommentList.map((subComment,i)=>{
      //判断是商家回复还是用户追评
      if(i === 0){
        //商家回复
        if(subComment.isMerchant){
          merchantText = <li className="comm_item_apply">对方回复：<span className="comm_item_appContent">{subComment.subContent}</span></li>
        }
        else{
          userSubText = <li className="comm_item_add">追加评价<span className="comm_item_addContent">{subComment.subContent}</span></li>
        }
      }
      else if(subComment.isMerchant&&i){   //商家回复追加评论
        merchantSubText = <li className="comm_item_apply">对方回复：<span className="comm_item_appContent">{subComment.subContent}</span></li>
      }
    })
     addCommentText = <ul className="comm_item_addUl">
        {userSubText}
        {merchantSubText}
      </ul>
    }
    console.log(commentItem)
     if(commentItem){
      return (
      <div className="comm_item_container">
        <table className="comm_item_table">
          <tbody>
            <tr>
              <td rowSpan="2" className="comm_item_imgTd"><img className="comm_item_img" src={comment.userLogo} /></td>
              <td className="comm_item_name">{comment.userName}</td>
              <td className="comm_item_date">{comment.commentDate}</td>
            </tr>
            <tr>
              <td className="comm_item_rate" colSpan="2"><Rate disabled allowHalf value={comment.star}></Rate></td>
            </tr>
          </tbody>
        </table>

        <ul className="comm_item_ul">
          <li className="comm_item_content">{comment.commentContent}</li>
          {merchantText}
        </ul>
        {addCommentText}
      </div>
    )
    }else{
      return(
        <div>暂无评论，快来抢第一个沙发吧！</div>
      )
    }
  }
}

export default CommentItem;