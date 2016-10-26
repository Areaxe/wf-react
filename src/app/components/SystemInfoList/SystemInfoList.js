// import EventEmitter from 'eventemitter3';
import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './SystemInfoList.scss';
import { Link } from 'react-router';

function formatDate(d) {
  let now = new Date(parseInt(d))
  let month = parseInt(now.getMonth())+1
  let date = now.getDate()
  if(month.toString().length===1) {
    month = '0'+month
  }
  if(date.toString().length===1) {
    date = '0'+date
  }
  return month+'-'+date
}
export default class SystemInfoList extends Component {

  render() {

    let InfoDatas = this.props.InfoDatas
    let userId = InfoDatas.userId
    let InfoList = InfoDatas.items.map(function (info, i) {
      let link = ''
      if(info.type === "ServerStart") {
        link = `/user/${userId}/serviceAbout`
      }else if(info.type === "ServerEnd") {
        link = `/user/${userId}/commentAbout`
      }else {
        link = `/service/${info.data[0].value}`
      }
      return (
        <Link className="single-info" key={i} to={link}>
          <p className="info-time">{formatDate(info.date)}</p>
          <div className="info-content info-center"><p>{info.content}</p></div>
        </Link>
      );
    });
    return (
      <div className='infoList'>
        { InfoList }
      </div>
    );
  }
}
 