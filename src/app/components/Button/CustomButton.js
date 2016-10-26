import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './CustomButton.scss';
import agreement from '../Agreement/Agreement';

export default class Button extends Component{
   constructor(props){
    super(props);
    this.state = {
      checked:true,
    };
   }
   getCheckState(){
    return this.state.checked;
   }
   handleClick(e){
    if (this.props.onClick) {
          this.props.onClick(e);
      }
   }
  render(){
    return (
      <div className='custom-button'>
        <button disabled={this.props.disabled} onClick={this.handleClick.bind(this)} className={this.props.type} style = {this.props.style} >
          {this.props.text||this.props.children}
        </button>
      </div>
      );
  }
}
 