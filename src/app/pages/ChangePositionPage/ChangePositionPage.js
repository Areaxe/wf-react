import React, { Component, PropTypes } from 'react'
import ReactDOM, {findDOMNode} from 'react-dom'
import Input from '../../components/Input/Input'
import PositionList from '../../components/PositionList/PositionList'
import style from './ChangePositionPage.scss'
import {Spin, message} from 'antd'
import DocumentTitle from 'react-document-title'

let addressList = ''

export default class ChangePositionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpin: false,
      showDelBtn: 'none',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states.personal.changeAddressInfo) {
      let res = nextProps.states.personal.changeAddressInfo
      if (res.code === 200) {
        setTimeout(function () {
          nextProps.history.goBack();
        }, 1000)
        this.setState({
          changeState: true,
        })
        message.config({
          top: 3000,
        });
      } else {
        message.error('修改失败！')
      }
    }
  }

  _inputPosition() {
    let position = ReactDOM.findDOMNode(this.refs.position).value.trim();
    if (position) {
      this.setState({
        showDelBtn: 'block',
      })
    }
    let _this = this
    AMap.plugin('AMap.Autocomplete', function () {//回调函数
      //实例化Autocomplete
      let autoOptions = {
        city: "广州", //城市，默认全国
        input: "position",//使用联想输入的input的id
      };
      let autocomplete = new AMap.Autocomplete(autoOptions)
      AMap.event.addListener(autocomplete, "select", postAddress);
      function postAddress(e) {
        let info = e.poi
        _this.props.actions.changePosition(info.district + info.address)
      }
    })
  }


  _getPosition() {
    let _this = this
    let geolocation
    new AMap.plugin('AMap.Geolocation', function () {
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 20000,          //超过10秒后停止定位，默认：无穷大
      });
      geolocation.getCurrentPosition();
      _this.setState({
        showSpin: true,
      })
      AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
      AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    //解析定位结果
    function onComplete(data) {
      let lnglatXY = [data.position.getLng(), data.position.getLat()]
      let geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all",
      });
      geocoder.getAddress(lnglatXY, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          geocoder_CallBack(result)
        }
      });

      function geocoder_CallBack(data) {
        let address = data.regeocode.formattedAddress; //返回地址描述
        _this.props.actions.changePosition(address)
        document.getElementById("position").value = address;
      }
      _this.setState({
        showSpin: false,
      })
    }
    //解析定位错误信息
    function onError(data) {
      message.error('定位失败!');
    }
  }

  clearText(clearName) {
    this.setState({
      showDelBtn: 'none',
    });
    ReactDOM.findDOMNode(this.refs.position).value = '';
  }

  render() {
    let spinText = ''
    let curAddress = ''
    if (this.state.showSpin) {
      spinText = <div className='spin-text'>正在获取地理位置信息...</div>
    }
    if (this.props.states.personal.userBaseInfo) {
      curAddress = this.props.states.personal.userBaseInfo[0].address
    }
    return (
      <DocumentTitle title='修改地址'>
        <div className='changePosition-page'>
          <div className='search-container'>
            <input className='search-input' id='position' ref='position' onChange={this._inputPosition.bind(this) } defaultValue={curAddress ? curAddress : ''} />
            <span className='delBtn' style={{ display: this.state.showDelBtn }} onClick={this.clearText.bind(this, 'position') }></span>
          </div>
          <div id="result1" className="autobox" name="result1"></div>
          <div className='changePosition'>
            <span className='icon'>
              <img src={require('../../images/location.png') } />
            </span>
            <div className="get-position" onClick={this._getPosition.bind(this) }>定位到当前位置</div>
          </div>
          {addressList}
          {spinText}
        </div>
      </DocumentTitle>
    );
  }
}