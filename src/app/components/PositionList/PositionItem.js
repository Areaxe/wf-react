import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './PositionList.scss';

export default class PositionItem extends Component{
  render(){
    
    return (
        <div className="position-item" >
          <img className="icon" src={this.props.data.icon} />
          <div className="position-content">{ this.props.data.position }</div>
        </div>
    );
  }
}