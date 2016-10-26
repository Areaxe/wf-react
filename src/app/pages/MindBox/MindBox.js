import React from 'react'
import Styles from './MindBox.scss'
import ImageGallery from '../../components/ImageGallery/ImageGallery'
import ActivityList from '../../components/ActivityList/ActivityList'
import Menu from '../../components/Menu/Menu'
import Logo from '../../components/logo/logo'
import DocumentTitle from 'react-document-title'
import {Link} from 'react-router'
import ServerHead from '../../components/ServerHead/ServerHead.js'
import ServerList from '../../components/ServiceList/ServiceList.js'
import DetailHead from '../../components/DetailHead/DetailHead.js'
import fwc from '../../images/zuixinfuwu.png'
import xsx from '../../images/xinshijia@3x.png'
import Loading from '../../components/Shade/Loading'

class MindBox extends React.Component {
  componentWillMount() {
    let _this = this
    let timer = setInterval(function () {
      if (_this.props.states.service.serviceList) {
        clearInterval(timer)
      } else {
        _this.props.actions.initServiceList()
      }
    }, 1000)
    setTimeout(function () {
      if (!_this.props.states.project.news) {
        clearInterval(timer)
        alert('网速好像不给力哦，稍候再试？')
      }
    }, 15000)
  }

  _serviceDetail(serviceId) {
    this.props.actions.serviceDetail(serviceId)
  }

  render() {
    let states = this.props.states
    let serList = []
    let serDatas = states.service.serviceList
    if (serDatas && serDatas.length) {
      for (let serData of serDatas) {
        if (serData.status !== 'full') {
          serList.push({
            type: 'service',
            data: serData,
          })
        }
      }
    }

    let detailHeadSetting = {
      tip: '服务推荐',
      imgLink: fwc,
    };
    let imgStyle = {
      width: '1.8rem',
      height: '1.8rem',
      verticalAlign: 'middle',
      marginRight: '.4rem',
    }
    if (serDatas) {
      return (
        <DocumentTitle title='心事匣'>
          <div className='mind-box'>
            <div className='img-container'>
              <p><img src={xsx} /></p>
              <p className='img-text'>功能完善中，敬请期待~</p>
            </div>
            <DetailHead info={detailHeadSetting} sheet={imgStyle}></DetailHead>
            <div className="app_service_list">
              {
                serList.map((val, i) => {
                  return <Link key={i} to={`/service/${val.data._id}`} onClick={this._serviceDetail.bind(this, val.data._id) } ><ServerHead item={val}></ServerHead></Link>
                })
              }
            </div>
          </div>
        </DocumentTitle>
      );
    } else {
      return <DocumentTitle title='心事匣'>
        <Loading />
      </DocumentTitle>
    }

  }
}

export default MindBox;