import React from 'react';
import { Button, Rate, Tag } from 'antd';
import Styles from './ServerHead.scss';

class ServerHead extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e) {
    e.preventDefault()
    if (e.target.getAttribute('alt') === null) {
      this.props.parentCallback(e.target.parentNode.getAttribute('value'), e.target.innerHTML.toString(), e.target.parentNode.getAttribute('alt'))
    } else {
      console.log(e.target.getAttribute('alt'))
      this.props.parentCallback(e.target.getAttribute('value'), e.target.innerHTML.toString(), e.target.getAttribute('alt'))
    }
  }

  render() {
    let trList = [];
    let imgTd = [];
    let btn = [];
    let item = this.props.item;
    let info = {};
    let sd = new Date(Number(item.data.startTime));
    let ed = new Date(Number(item.data.endTime));
    info.id = item.data._id
    info.signinState = item.data.userStatus.signinState
    switch (item.type) {
      case 'service':
        info.showImg = true;
        info.showState = true;
        info.whName = false;
        info.showDateAndName = true;
        info.showTag = true;
        if (item.data.status === 'accept') {
          if (item.data.userStatus.registState === 'unregist') {
            info.status = '可预约';
            info.classsName = 'ser_head_btn_ghost';
          } else if (item.data.userStatus.registState === 'registed') {
            info.status = '已预约';
            info.classsName = 'ser_head_btn_ghost_ordered';
          }
        } else if (item.data.status === 'full') {
          info.status = '已满额';
          info.classsName = 'ser_head_btn_ghost_full';
        }
        break;
      case 'detail':
        info.showAllTitle = true;
        info.whName = true;
        info.showAllTime = true;
        info.showTag = true;
        break;
      case 'old':
        info.showImg = true;
        if (item.data.userStatus.registState === 'registed' && item.data.userStatus.evaluateState === 'evaluatable') {
          info.showButton = true;
          info.comment = '点评';
          info.classsName = 'ser_head_btn_primary';
        } else if (item.data.userStatus.registState === 'registed' && item.data.userStatus.evaluateState === 'addable') {
          info.showButton = true;
          info.comment = '追加点评';
          info.classsName = 'ser_head_btn_primary';
        } else {
          info.showOnlyTitle = true;
        }
        info.whName = true;
        info.showAllTime = true;
        info.showRate = true;
        info.rate = item.data.star;
        break;
      case 'oldDetail':
        info.showAllTitle = true;
        info.whName = true;
        info.showAllTime = true;
        info.showRate = true;
        info.rate = item.data.star;
        info.showTag = true;
        break;
      case 'newService':
        info.showImg = true;
        info.showButton = true;
        info.whName = false;
        info.showDateAndName = true;
        info.showTag = true;
        info.comment = '取消预约';
        info.classsName = 'ser_head_btn_primary_cancel';
        break;
      default:
        break;
    }
    if (info.showImg) {
      imgTd.push(<td key="0" className="ser_head_imgTd" rowSpan="4">
        <img className="ser_head_img" src={item.data.cover.url} />
      </td>);
    }
    if (info.showButton) {
      switch (info.signinState) {
        case 'unsignin':
          btn.push(<td key="3" className="ser_head_td ser_head_td_btn18 ser_head_btn_disabled"><Button alt={info.signinState} value={info.id} onClick={this._handleClick.bind(this, )} type="primary" className={info.classsName}>{info.comment}</Button></td>);
          break
        case 'signined':
          btn.push(<td key="3" className="ser_head_td ser_head_td_btn18"><Button alt={info.signinState} value={info.id} onClick={this._handleClick.bind(this, )} type="primary" className={info.classsName}>{info.comment}</Button></td>);
          break
        default:
          btn.push(<td key="3" className="ser_head_td ser_head_td_btn18"><Button alt={info.signinState} value={info.id} onClick={this._handleClick.bind(this, )} type="primary" className={info.classsName}>{info.comment}</Button></td>);
          break
      }
      trList.push(<tr key="02">
        {imgTd}
        <td key="5" colSpan="2" className="ser_head_title ser_head_pad3rem">{item.data.name}</td>
        {btn}
      </tr>);
    } else if (info.showState) {
      trList.push(<tr key="03">
        {imgTd}
        <td key="6" colSpan="2" className="ser_head_title ser_head_pad3rem">{item.data.name}</td>
        <td key="7" className="ser_head_td ser_head_td_state"><Button type="ghost" className={info.classsName}>{info.status}</Button></td>
      </tr>);
    } else if (info.showOnlyTitle) {
      trList.push(<tr key="04">
        {imgTd}
        <td key="8" colSpan="3" className="ser_head_title ser_head_pad3rem">{item.data.name}</td>
      </tr>);
    } else if (info.showAllTitle) {
      trList.push(<tr key="05">
        {imgTd}
        <td key="9" colSpan="3" className="ser_head_allTitle ser_head_pad3rem">{item.data.name}</td>
      </tr>);
    }
    if (info.whName) {
      trList.push(<tr key="06">
        <td key="10" colSpan="3" className="ser_head_pad3rem ser_head_numTitle">报名人数&nbsp; &nbsp; <span className="ser_head_num">{item.data.registedcount}/{item.data.maxcount}</span><span>{item.data.region.name}</span></td>
      </tr>);
    } else {
      trList.push(<tr key="07">
        <td key="11" className="ser_head_pad3rem ser_head_numTitle" colSpan="3">报名人数&nbsp; &nbsp; <span className="ser_head_num">{item.data.registedcount}/{item.data.maxcount}</span></td>
      </tr>);
    }
    if (info.showDateAndName) {
      trList.push(<tr key="08">
        <td key="12" colSpan="3" className="ser_head_pad3rem ser_head_numTitle">{sd.getMonth() + 1}月{sd.getDate()}日<span className="ser_head_span_name">{item.data.region.name}</span></td>
      </tr>);
    }
    if (info.showAllTime) {
      trList.push(<tr key="09">
        <td key="13" colSpan="3" className="ser_head_pad3rem ser_head_numTitle">
          {sd.getFullYear()}/{sd.getMonth() + 1}/{sd.getDate()}&nbsp; {sd.getHours() > 9 ? sd.getHours() : '0' +
            sd.getHours()}: {sd.getMinutes() > 9 ? sd.getMinutes() : '0' +
              sd.getMinutes()}~{ed.getFullYear()}/{ed.getMonth() + 1}/{ed.getDate()}&nbsp;
             {ed.getHours() > 9 ? ed.getHours() : '0' + ed.getHours()}: {ed.getMinutes() > 9 ? ed.getMinutes() : '0' + ed.getMinutes()}
        </td>
      </tr>);
    }
    if (info.showRate) {
      trList.push(<tr key="010">
        <td key="14" className="ser_head_pad3rem" colSpan="3">整体评价&nbsp; &nbsp; <Rate disabled allowHalf value={info.rate} /></td>
      </tr>);
    }
    if (info.showTag) {
      let tags = item.data.tags.map(function (it, index) {
        return <Tag key={index} className="ser_head_tag">{it.name}</Tag>
      })
      trList.push(
        <tr key="011">
          <td key="15" className="ser_head_pad3rem ser_head_numTitle" colSpan="3">
            {tags}
          </td>
        </tr>
      );
    }

    return (
      <div className="ser_head_container">
        <table className="ser_head_table">
          <tbody>
            {trList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ServerHead;
