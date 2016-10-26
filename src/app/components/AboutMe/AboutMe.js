import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './AboutMe.scss';
import service_icon from "../../images/service.png";
import comment_icon from "../../images/comment.png";
import point_icon from "../../images/Individual_points.png";
import logoImg from "../../images/yn.jpg"
import { Link } from 'react-router';

export default class AboutMe extends Component {

  render() {
    let BaseInfo = {}
    let userId = ''
    if (this.props.data) {
      let info = this.props.data
      userId = info._id
      BaseInfo = {
        link: "/editUserInfo",
        imgUrl: info.headimgurl,
        nickName: info.nickname,
        userPhone: info.phone ? info.phone : '请绑定手机号',
        operateText: '修改信息',
      }
    }

    const myDatas = [
      {
        link: `/user/${userId}/serviceAbout`,
        iconUrl: service_icon,
        content: "服务相关",
      }, {
        link: `/user/${userId}/commentAbout`,
        iconUrl: comment_icon,
        content: "点评相关",
      }, {
        link: "/integral",
        iconUrl: point_icon,
        content: "个人积分",
      }];

    let MyInfoList = myDatas.map(function (info, i) {
      return (
        <Link className="single-info" key={i} to={info.link}>
          <div className="info-left"><img src={info.iconUrl}/></div>
          <div className="info-center"><p>{info.content}</p></div>
        </Link>
      );
    });
    return (
      <div className='AboutMe'>
        <Link className='baseInfo' to={BaseInfo.link }>
          <div className='img-container'>
            <div className='shade'>
              <img className='userImg' src={BaseInfo.imgUrl}/>
            </div>
          </div>
          <div className="info-center">
            <p className='nickName'>{BaseInfo.nickName}</p>
            <p className='userPhone'>{BaseInfo.userPhone}</p>
          </div>
          <span className='reminder-text'>{BaseInfo.operateText}</span>
        </Link>
        <div className="personInfo-list">
          { MyInfoList }
        </div>

      </div>
    );
  }
}
 