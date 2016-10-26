import React, { Component, PropTypes } from 'react';
import ReactDOM , {findDOMNode} from 'react-dom';
import styles from './LoginInput.scss';
import { Button, Icon } from 'antd';

export default class LoginInput extends Component {
  // static propTypes = {
  //     _onChange: PropTypes.func,
  // };

  constructor(props) {
    super(props);
    this.state = {
      showDelPhone: 'none',
      showDelChexkCode: 'none',
      checkCodeText: '验证',
      lastTime: 60,
      checkDisable: true,
    };
    this._onChange = this._onChange.bind(this);
  }

  _checkPhone() {
    const PHONE_REGEXP = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
    let phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
    if (phone) {
      this.setState({
        checkDisable: false,
        showDelPhone: 'block',
      });

      if (PHONE_REGEXP.test(phone)) {
        this.props.checkPhone(true);
        return true;
      }
      else {
        this.props.checkPhone(false);
        return false;
      }
      this.props.isEmpty(false);
    }

    else {
      this.props.checkPhone(true);
      this.props.isEmpty(true);
      return false;
    }
  }

  _onChange() {
    const PHONE_REGEXP = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
    let phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
    let checkCode = ReactDOM.findDOMNode(this.refs.checkCode).value.trim();

    this.setState({
      showDelPhone: 'none',
      showDelChexkCode: 'none',
      checkDisable: true,
    })
    if (phone) {
      this.props.isEmpty(false);
      this.setState({
        checkDisable: false,
        showDelPhone: 'block',
      });
    } else {
      this.props.isEmpty(true);//账号输入为空
    }
    if (checkCode) {
      this.setState({
        showDelChexkCode: 'block',
      });
    }
  }


  //点击验证码按钮
  onCheckboxClick() {
    if (this.state.lastTime && this._checkPhone()) {
      let _this = this;
      _this.timer = null;
      let phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
      this.props.actions.checkPhone(phone);
      let checkBtn = ReactDOM.findDOMNode(this.refs.checkBtn);
      if (this._checkPhone()) {
        _this.timer = setInterval(function () {
          _this.setState({
            lastTime: --_this.state.lastTime,
            checkDisable: true,
          });
          _this.setState({checkCodeText: _this.state.lastTime});
          if (_this.state.lastTime === 0) {
            clearInterval(_this.timer);
            _this.setState({checkCodeText: '重新验证', lastTime: 60});
          }
        }, 1000);
      }
    }
  }


  clearText(clearName) {
    //clearInterval(this.timer);
    switch (clearName) {
      case 'phone':
        ReactDOM.findDOMNode(this.refs.phone).value = '';
        this.setState({
          showDelPhone: 'none',
          checkDisable: true,
        })
        this.props.isEmpty(true);
        this.props.checkPhone(true);
        break;
      case  'checkCode':
        this.setState({
          showDelChexkCode: 'none',
        })
        ReactDOM.findDOMNode(this.refs.checkCode).value = '';
        break;
    }
  }


  render() {

    return (
      <div className='login-input'>
        <div className='errorText'>{ this.state.errorMsg }</div>
        <div className="input-div"><span className="telphone-icon"></span>
          <div id="telphone">
            <input placeholder="请输入手机号码" ref='phone' onChange={this._onChange}/>
            <span className='delBtn' style={{display:this.state.showDelPhone}}
                  onClick={this.clearText.bind(this,'phone')}></span>
          </div>
          <Button className='security-code' ref='checkBtn' disabled={this.state.checkDisable}
                  onClick={this.onCheckboxClick.bind(this)}>{this.state.checkCodeText}</Button>
        </div>
        <div className="input-div">
          <span className="check-icon"></span>
          <div id="check-code">
            <input ref='checkCode' placeholder="请输入验证码" ref='checkCode' onChange={this._onChange}/>
            <span className='delBtn' style={{display:this.state.showDelChexkCode}}
                  onClick={this.clearText.bind(this,'checkCode')}></span>
          </div>
        </div>
      </div>

    );
  }
}
