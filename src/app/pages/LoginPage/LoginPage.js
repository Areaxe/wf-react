import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import { Tooltip, message, Button } from 'antd';
import DocumentTitle from 'react-document-title';

import CustomButton from '../../components/Button/CustomButton';
import LoginInput from '../../components/Input/LoginInput';
import Agreement from '../../components/Agreement/Agreement';
import CommentArea from '../../components/CenterContents/PromptDialog';

import Style from './loginPage.scss';
import styles from '../../components/Input/LoginInput.scss';


export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      showErrorTig: false,
      isEmptyPhone: true,
      errorText: '手机号或验证码不正确',
      showDelPhone: 'none',
      showDelChexkCode: 'none',
      checkCodeText: '验证',
      lastTime: 60,
      checkDisable: true,
      checkResult: '',
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let states = nextProps.states
    if (states.login.checkCode === 200 && states.login.loginIn) {
      nextProps.history.goBack()
      return
    }
    if (states.login.message !== '') {
      message.error(states.login.message);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  getCheckedState(checkState) {
    this.setState({
      checked: checkState,
    });
  }

  //验证手机合法性
  _checkPhone() {
    const PHONE_REGEXP = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
    let phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
    if (phone) {  //如果手机号不为空
      this.setState({
        showDelPhone: 'block',
        checkDisable: true,

      });
      if (phone.length === 11) {
        this.setState({
          checkDisable: false,
        })
      }
      if (PHONE_REGEXP.test(phone)) { //手机号码正确输入
        return true;
      }
      else {
        this.setState({
          errorText: '手机号输入不正确！',
        })
        return false;
      }
    }

    else {  //手机号码为空
      this.setState({
        errorText: '手机号不能为空！',
        checkDisable: true,
      })
      return false;
    }
  }

  _onChange() {
    this._checkPhone()

    this.setState({
      showDelPhone: 'none',

    })

  }

  _checkCode() {
    let code = ReactDOM.findDOMNode(this.refs.checkCode).value.trim();
    this.setState({
      showDelChexkCode: 'none',
    })
    if (code) {
      this.setState({
        showDelChexkCode: 'block',
      });
    }
  }

  login() {
    this._checkPhone()
    if (!this._checkPhone()) {
      message.error(this.state.errorText);
    }else {
      let phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
      let code = ReactDOM.findDOMNode(this.refs.checkCode).value.trim();
      if(code){
        this.props.actions.checkCode(this.props.states.project.token, phone, code);
      }else{
        message.error('验证码不能为空！')
      }
    }
  }

  //点击验证码按钮
  onCheckboxClick() {
    this._checkPhone()
    if (this.state.lastTime && this._checkPhone()) {
      let _this = this;
      _this.timer = null;
      let phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
      this.props.actions.checkPhone(phone);
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
            console.log(_this._checkPhone())
            if (_this._checkPhone()) {
              _this.setState({
                checkDisable: false,
              })
            }
          }
        }, 1000);
      }
    } else {
      message.error(this.state.errorText);
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
        this._checkPhone();
        break;
      case 'checkCode':
        this.setState({
          showDelChexkCode: 'none',
        })
        ReactDOM.findDOMNode(this.refs.checkCode).value = '';
        break;
    }
  }

  render() {

    //<LoginInput checkPhone={this.validatePhone.bind(this)} isEmpty={this.emptyPhone.bind(this)}/>

    let disabledState = !( this.state.checked? true : false)
    let headimg = this.props.states.project.wxUser.headimgurl? this.props.states.project.wxUser.headimgurl : ''
    //require('../../images/yn.jpg')
    return (
      <DocumentTitle title='登录/注册'>
        <div>
          <div className="userImg-container">
            <div className="shade">
              <img className='userImg' src={headimg}/>
            </div>
            <div className='loginText'>为了给您更好地服务请用手机号登录</div>
          </div>
          <div className='login-input'>
            <div className="input-div"><span className="telphone-icon"></span>
              <div id="telphone">
                <input placeholder="请输入手机号码" ref='phone' onChange={this._onChange.bind(this)}/>
            <span className='delBtn' style={{display:this.state.showDelPhone}}
                  onClick={this.clearText.bind(this,'phone')}></span>
              </div>
              <Button className='security-code' ref='checkBtn' disabled={this.state.checkDisable}
                      onClick={this.onCheckboxClick.bind(this)}>{this.state.checkCodeText}</Button>
            </div>
            <div className="input-div">
              <span className="check-icon"></span>
              <div id="check-code">
                <input ref='checkCode' placeholder="请输入验证码" onChange={this._checkCode.bind(this) }/>
            <span className='delBtn' style={{display:this.state.showDelChexkCode}}
                  onClick={this.clearText.bind(this,'checkCode')}></span>
              </div>
            </div>
          </div>
          <Agreement checkState={this.getCheckedState.bind(this)}/>
          <div className='loginPage-btn'>
            <div className='login-btn'>
              <CustomButton disabled={disabledState} onClick={this.login.bind(this)}>绑定手机号</CustomButton>
            </div>
            <Link to='/'>
              <CustomButton text='随便逛逛' type='light-theme'/>
            </Link>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

