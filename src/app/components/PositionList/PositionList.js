import React, { Component, PropTypes, findDOMNode } from 'react';
import PositionItem from './positionItem.js';

export default class PositionList extends Component{
  render(){
    let PositionDatas = [
      {
      icon: require("../../images/address_32.png"),
      position:"07-10",
    },{
      icon: require("../../images/address_32.png"),
      position:"07-10",
    },{
      icon: require("../../images/address_32.png"),
      position:"07-10",
    },{
      icon: require("../../images/address_32.png"),
      position:"07-10",
    }];
    
    return (
        <div className='positionList'>
          {
            PositionDatas.map( (title) => (
              <PositionItem data={title} />
            ))
          }
        </div>
    )
  }
    
}