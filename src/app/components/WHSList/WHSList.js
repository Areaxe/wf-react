import React from 'react';
import DocumentTitle from 'react-document-title';
import CommentItem from '../NeighborComment/NeighborCommentItem';
import {Icon} from 'antd';
import './WHSList.scss';
import {Link} from 'react-router'

import new_service_28 from '../../images/zuixinfuwu.png';
import old_service_28 from '../../images/guoqufuwu@3x.png';
import neighbor_comment_28 from '../../images/jiefangreping@3x.png';

//clock-circle
class WHSList extends React.Component {

  render() {
    console.log('列表')
    console.log(this.props)
    let whomeId = this.props.whomeId
    let newServices = this.props.newService
    let oldServices = this.props.oldService
    let type = this.props.type
    let uls
    let list

    if (type === 'new') {
      if (newServices && newServices.length) {
        list = newServices.map((newService, i) => {
          for (; i < 2;) {
            return <Link key={'01'+i} to={`/service/${newService._id}`}>
              <ul key={'0' + i} className="whs_list_ul2">
                <li className="whs_list_serName">{newService.name}</li>
                <li className="whs_list_iconRight"><Icon className="whs_list_right whs_list_add" type="right"></Icon>
                </li>
              </ul>
            </Link>
          }
        })
      } else {
        list = <div className='whs_noServiceData'>暂无最新服务</div>
      }
      uls =
        <ul key='0' className="whs_list_ul">
          <li className="whs_list_new"><img className="whs_list_icon" src={new_service_28}/>最新服务</li>
          <li className="whs_list_more"><Link to={`/whomeService/${whomeId}/new`}>更多最新服务<Icon className="whs_list_right"
                                                                                              type="right"></Icon></Link>
          </li>
        </ul>
    }
    else if (type === 'old') {
      if (oldServices && oldServices.length) {
        list = oldServices.map((oldService, i) => {
          for (; i < 2;) {
            return <Link key={'01'+i} to={`/oldServiceDetail/${oldService._id}`}>
              <ul key={'0' + i} className="whs_list_ul2">
                <li className="whs_list_serName">{oldService.name}</li>
                <li className="whs_list_iconRight"><Icon className="whs_list_right whs_list_add" type="right"></Icon>
                </li>
              </ul>
            </Link>
          }
        })
      } else {
        list = <div className='whs_noServiceData'>暂无历史服务</div>
      }
      uls =
        <ul key='3' className="whs_list_ul">
          <li className="whs_list_new"><img className="whs_list_icon" src={old_service_28}/>过去服务</li>
          <li className="whs_list_more"><Link to={`/whomeService/${whomeId}/pass`}>更多过去服务<Icon
            className="whs_list_right" type="right"></Icon></Link></li>
        </ul>

    } else if (type === 'comment') {
      let commentDatas = this.props.commentData
      if (commentDatas && commentDatas.length) {
        list = commentDatas.map((commentData, i) => {
          for (; i < 2;) {
            return <ul key={'c' + i} className="whs_list_ul2">
              <li className="whs_list_serName">{commentData.content}</li>
            </ul>
          }
        })
      } else {
        list = <div className='whs_noServiceData'>暂无热评</div>
      }
      uls =
        <ul key='6' className="whs_list_ul">
          <li className="whs_list_new"><img className="whs_list_icon" src={neighbor_comment_28}/>街坊热评</li>
          <li className="whs_list_more"><Link to={`/neighborComment/${this.props.whomeId}`}>更多热评<Icon
            className="whs_list_right" type="right"></Icon></Link></li>
        </ul>
    }
    return (
      <div className="whs_list_container">
        {uls}
        {list}
      </div>
    );
  }
}

export default WHSList;

