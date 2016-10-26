import React, { Component, PropTypes } from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import CustomButton from '../../components/Button/CustomButton';
import {Button, message} from 'antd'
import style from './ChangePhonePage.scss'
import DocumentTitle from 'react-document-title';

export default class ChangePhonePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorTip: true,
      errorText: '手机号输入不正确！',
      showDelPhone: 'none',
      showDelChexkCode: 'none',
      checkCodeText: '验证',
      lastTime: 60,
      checkDisable: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    let states = nextProps.states
    if (states.login.loginIn === true) {
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

  _changePhone() {
    this._checkPhone()
    if (!this._checkPhone()) {
      message.error(this.state.errorText);
      message.config({
        top: 300,
      });
    } else {
      let phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
      let code = ReactDOM.findDOMNode(this.refs.checkCode).value.trim();
      if(code){
        this.props.actions.checkCode(this.props.states.project.token, phone, code);
      }else{
        message.error('验证码不能为空！')
      }
    }
  }

  onCheckboxClick() {
    if (this._checkPhone()) {
      let phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
      this.props.actions.checkPhone(phone);
    } else {
      message.error(this.state.errorText);
      message.config({
        top: 3000,
      });
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

  //点击验证码按钮
  onCheckboxClick() {
    this._checkPhone()
    if (this.state.lastTime && this._checkPhone()) {
      let _this = this;
      _this.timer = null;
      let phone = ReactDOM.findDOMNode(this.refs.phone).value.trim();
      this.props.actions.checkPhone(phone);
      let checkBtn = ReactDOM.findDOMNode(this.refs.checkCode);
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
      message.config({
        top: 3000,
      });
    }
  }


  render() {
    return (
      <DocumentTitle title='修改手机号'>
        <div className='changePhone-page'>
          <div className='login-input'>
            <div className="input-div"><span className="telphone-icon"></span>
              <div id="telphone">
                <input placeholder="请输入手机号码" ref='phone' maxLength="11" onChange={this._onChange.bind(this) }/>
								<span className='delBtn' style={{ display: this.state.showDelPhone }}
                      onClick={this.clearText.bind(this, 'phone') }></span>
              </div>
              <div className='security-code'>
                <button ref='checkBtn' disabled={this.state.checkDisable}
                        onClick={this.onCheckboxClick.bind(this) }>{this.state.checkCodeText}</button>
              </div>
            </div>
            <div className="input-div">
              <span className="check-icon"></span>
              <div id="check-code">
                <input placeholder="请输入验证码" ref='checkCode' onChange={this._checkCode.bind(this) }/>
								<span className='delBtn' style={{ display: this.state.showDelChexkCode }}
                      onClick={this.clearText.bind(this, 'checkCode') }></span>
              </div>
            </div>
          </div>

          <div className="change-button">
            <CustomButton onClick={this._changePhone.bind(this) }>确定</CustomButton>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}




	

