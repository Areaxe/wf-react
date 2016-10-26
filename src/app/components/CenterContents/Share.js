import React, { Component, findDOMNode } from 'react';
import styles from './Share.scss';
import imgplace from '../../images/weixin.png'

export default class Share extends Component {

  _handleClick(e) {
    this.props.callbackParent(e)
  }

  render() {
    let ShareDatas = this.props.ShareDatas
    let arr = []

    for (let obj of ShareDatas) {
      arr.push(
        <li onClick={this._handleClick.bind(this)} key={obj.key}>
          <p className='img-container'><img alt={obj.key} src={imgplace}/></p>
          <p className='plate-name' alt={obj.key}>
            { obj.name }
          </p>
        </li>
      );
    }
    return (
      <div className='share-prom'>
        <p className='share-title'>分享到其他平台</p>
        <ul className='plate-list'>
          { arr }
        </ul>
      </div>
    );
  }
}
 