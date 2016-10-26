import React from 'react';
import DocumentTitle from 'react-document-title';
import AddressInfo from '../../components/AddressInfo/AddressInfo';
import WHSList from '../../components/WHSList/WHSList';
import Button from '../../components/Button/CustomButton';
import {Rate} from 'antd';
import style from './WhomeMap.scss';
import addressIcon from '../../images/adress_28_org.png';
import dhIcon from '../../images/daohang@3x.png';
import Loading from '../../components/Shade/Loading'

function walkingRoad(targetloa) {
  let myYX
  let geolocation
  //获取用户经纬度
  new AMap.plugin('AMap.Geolocation', function () {
    geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 20000,          //超过10秒后停止定位，默认：无穷大
    })
    geolocation.getCurrentPosition()
    AMap.event.addListener(geolocation, 'complete', onComplete)//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError)      //返回定位出错信息
  })
  //解析定位结果
  function onComplete(data) {
    myYX = [data.position.getLng(), data.position.getLat()]
    let map = new AMap.Map("allmap", {  //设置地图
      resizeEnable: true,
      center: targetloa,//地图中心点
    })

    let walking = new AMap.Walking({
      map: map,
      panel: "panel",
    });
    //根据起终点坐标规划步行路线
      walking.search(myYX, targetloa);
  }
  //解析定位错误信息
  function onError(data) {
    message.error('定位失败!')
  }

}

class WhomeMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpin: false,
    }
  }
  componentWillMount() {
    if (!this.props.states.federation.whomeDetailInfo) {
      let whomeId = this.props.params._whomeId
      this.props.actions.whomeDetail(whomeId)
    }
  }
  componentWillReceiveProps() {
    if (!this.props.states.federation.whomeDetailInfo) {
      let whomeId = this.props.params._whomeId
      this.props.actions.whomeDetail(whomeId)
    } else {
      let location = []
      if (this.props.states.federation.whomeDetailInfo && document.querySelector('#allmap')) {
        let whomeInfo = this.props.states.federation.whomeDetailInfo[0]
        whomeInfo.location.map((val) => {
          location.push(Number(val))     //数据化后台读取的妇女之家坐标
        })
        if (location.length) {
          walkingRoad(location)
        }
      }
    }

  }


  componentDidMount() {
    if (!this.props.states.federation.whomeDetailInfo) {
      let whomeId = this.props.params._whomeId
      this.props.actions.whomeDetail(whomeId)
    } else {
      let location = []
      if (this.props.states.federation.whomeDetailInfo && document.querySelector('#allmap')) {
        let whomeInfo = this.props.states.federation.whomeDetailInfo[0]
        whomeInfo.location.map((val) => {
          location.push(Number(val))     //数据化后台读取的妇女之家坐标
        })
        if (location.length) {
          walkingRoad(location)
        }
      }
    }
  }

  _getNavgation() {
    let _this = this
    let geolocation
    new AMap.plugin('AMap.Geolocation', function () {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      });
      geolocation.getCurrentPosition();
      _this.setState({
        showSpin: true,
      })
      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });

    function onComplete(data) {
      let myXY = []
      let coordinates = _this.props.states.federation.whomeDetailInfo[0].location
      let addr = _this.props.states.federation.whomeDetailInfo[0].address
      let whomeXY = [Number(coordinates[0]), Number(coordinates[1])]
      myXY = [data.position.getLng(), data.position.getLat()]
      window.location.href = `http://api.map.baidu.com/direction?origin=${myXY[1]},${myXY[0]}|name:我的位置&destination=${addr}&mode=walking&region=广州&output=html&src=pondbaystudio|weixin`
    }
    function onError() {
      alert('定位失败!');
    }
  }


  render() {

    let spinText = ''
    let whomeInfo = ''
    if (this.state.showSpin) {      //数据未渲染出来时显示
      spinText = <Loading />
    }
    if (this.props.states.federation.whomeDetailInfo) {
      let whomeInfo = this.props.states.federation.whomeDetailInfo[0]
      return <DocumentTitle title="妇女之家详情">
        <div className='whome-mapPage' style={{ backgroundColor: '#f4f5f7', width: '100%' }}>
          <div id="allmap"></div>
          <div id="panel"></div>
          <div className="bottom-info">
            <div className='whome-address'>
              <img className="address-img" src={addressIcon} />
              <span className='address'>{whomeInfo.address}</span>
            </div>
            <Button onClick={this._getNavgation.bind(this) }><img src={dhIcon} />开始导航</Button>
          </div>
          {spinText}
        </div>
      </DocumentTitle>
    } else {
      return <DocumentTitle title="妇女之家详情"><Loading /></DocumentTitle>
    }
  }
}

export default WhomeMap