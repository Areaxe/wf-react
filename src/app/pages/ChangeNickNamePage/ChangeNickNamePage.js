import React, { Component} from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import styles from './changeNicknamePage.scss';
import {message } from 'antd';
import UserInput from '../../components/Input/Input';
import ChangeButton from '../../components/Button/CustomButton';
import DocumentTitle from 'react-document-title';
import ReactDOM, {findDOMNode} from 'react-dom';



export default class changeNickname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeState: false,
      remindText: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states.personal.changenameInfo) {
      let res = nextProps.states.personal.changenameInfo
      if (res.code === 200) {
        message.info('修改成功！')
         window.history.back();
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



  _changeName() {
    let name = ReactDOM.findDOMNode(this.refs.userName).value.trim();
    this.props.actions.changeName(name)


  }
  render() {
    let curName = ''
    if (this.props.states.personal.userBaseInfo) {
      curName = this.props.states.personal.userBaseInfo[0].nickname
    }
    return (
      <DocumentTitle title='修改昵称'>
        <div>
          <div className='mt1'>
            <input className='input-nickname' ref='userName' placeholder='请输入昵称' defaultValue = {curName}/>
            <div className='midButton'>
              <ChangeButton onClick={this._changeName.bind(this) } text='使用该昵称' />
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}