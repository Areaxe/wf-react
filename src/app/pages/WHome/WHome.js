import React from 'react';
import WHomeInfo from '../../components/WHomeInfo/WHomeInfo';
import DocumentTitle from 'react-document-title';
import TopMenu from '../../components/TopMenu/TopMenu';
import Menu from '../../components/Menu/Menu';
import { Affix, Tabs } from 'antd';
import style from './WHome.scss';
import { Link } from 'react-router';
import Loading from '../../components/Shade/Loading'

class WHome extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      orderByDistance: true,
      orderBystar: false,
      longitude: '',
      latitude: '',
    }
  }

  componentWillMount() {
    this._getCurPosition()
  }

  componentDidMount() {
    let states = this.props.states
    if (states.federation && states.federation.isfirst) {
      this.props.actions.initFederation()
    }
  }

  componentWillReceiveProps(nextProps) {
    let states = nextProps.states
    if (states.federation && states.federation.isfirst) {
      this.props.actions.initFederation()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  _getCurPosition() {
    //获取经纬度
    let longitude, latitude
    let _this = this
    navigator.geolocation.getCurrentPosition(function (position) {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      _this.setState({
        longitude: longitude,
        latitude: latitude,
      })
    });
  }

  /**
   * 按距离排序
   * @private
   */
  _orderByDistance() {
    if (this.state.orderByDistance) {
      return
    }
    if (this.state.latitude && this.state.longitude) {
      let first = false
      if (this.props.states.federation.distanceInfo.length === 0) {
        first = true
      }
      this.props.actions.orderByDistance(first, this.state.longitude, this.state.latitude)
    }
    this.setState({
      orderByDistance: true,
      orderBystar: false,
    })
  }

  /**
   * 按星级排序
   * @private
   */
  _orderByStar() {
    if (this.state.orderBystar) {
      return
    }
    let first = false
    if (this.props.states.federation.starInfo.length === 0) {
      first = true
    }
    this.props.actions.orderByStar(first)
    this.setState({
      orderByDistance: false,
      orderBystar: true,
    })
  }
  _whomeDetail(whomeId) {
    this.props.actions.whomeDetail(whomeId)
  }

  render() {
    let infoList = []
    let womenHomeInfo = this.props.states.federation.womenHomeInfo
    if (this.state.orderByDistance && this.props.states.federation.distanceInfo.length > 0) {
      womenHomeInfo = this.props.states.federation.distanceInfo
    }
    if (this.state.orderBystar && this.props.states.federation.starInfo.length > 0) {
      womenHomeInfo = this.props.states.federation.starInfo
    }
    if (womenHomeInfo.length > 0) { //获取到数据
      for (let womenInfo of womenHomeInfo) {
        infoList.push({
          id: womenInfo._id,
          name: womenInfo.name,
          address: womenInfo.address,
          logo: womenInfo.logo.url + '@128h_128w_1e_1c',
          phone: womenInfo.phone,
          star: womenInfo.star,
        })
      }
      let distanceBottom = this.state.orderByDistance ? 'on' : '';
      let starBottom = this.state.orderBystar ? 'on' : '';
      return (
        <DocumentTitle title='妇女之家'>
          <div>
            <div className='whome-list'>
              <div className='wHome-title'>
                <ul>
                  <li className={distanceBottom} onClick={this._orderByDistance.bind(this) }><span>距离</span></li>
                  <li className={starBottom} onClick={this._orderByStar.bind(this) }><span>评分</span></li>
                </ul>
              </div>
              <div className='whome-tab'>
                {
                  infoList.map((val, i) => {
                    return <Link key={i} to={`/whDetail/${val.id}`} onClick={this._whomeDetail.bind(this, val.id) }><WHomeInfo type="star" info={val}></WHomeInfo></Link>
                  })
                }
              </div>
            </div>
            <Menu index="1"></Menu>
          </div>
        </DocumentTitle>
      );
    } else {
      return (
        <DocumentTitle title='妇女之家'>
          <Loading />
        </DocumentTitle>
      )
    }
  }
}

export default WHome;

