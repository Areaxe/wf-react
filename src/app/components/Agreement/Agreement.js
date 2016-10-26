import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './Agreement.scss';

export default class AboutArgument extends Component{

   constructor(props){
    super(props);
    this.state = {
      agreenClass: 'checkbox-img agreen-img-on',
      checked: true,
    };
   }
   getIfAgreen(){
    // this.setState({
    //   checked:!this.state.checked,
    // })
    this.state.checked = !this.state.checked
    if(this.state.checked){
      this.setState({
        agreenClass: 'checkbox-img agreen-img-on',
      });
    }else{
      this.setState({
        agreenClass: 'checkbox-img agreen-img-off',
      });
    }
    this.props.checkState(this.state.checked);
   }

  render(){
    
    return (
      <div className="showAgreement">
        <span className={this.state.agreenClass} onClick = {this.getIfAgreen.bind(this)}>
        </span>
        <label onClick = {this.getIfAgreen.bind(this)} className="reminder">已阅读并同意</label>
        <a className="agreement-link">从化掌上妇联用户协议</a>
      </div>
      );
  }
}