// import EventEmitter from 'eventemitter3';
import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './InfoList.scss';

export default class InfoList extends Component{
 
	render(){
		const MyInfoDatas = [
		  {
			link:"http://localhost:3000",
			iconUrl:"../../images/shoujihao.png",
			content:"汽车之家易 车 网太平洋汽车安 居 客折800苏宁手机驴妈妈旅游百度•热搜赶 集 网当 当 网途牛旅游网1 号 店珍爱婚恋网乐居二手房"
		},{
			link:"http://localhost:3000",
			iconUrl:"07-10",
			content:"-1200"
		},{
			link:"http://localhost:3000",
			iconUrl:"07-10",
			content:"-1200"
		},{
			link:"http://localhost:3000",
			iconUrl:"07-10",
			content:"汽车之家易 车 网太平洋汽车安 居 客折800苏宁手机驴妈妈旅游百度•热搜赶 集 网当 当 网途牛旅游网1 号 店珍爱婚恋网乐居二手房"
		}];
		
		let MyInfoList = MyInfoDatas.map(function (info) {
        return (
          	<a className="single-info" href={info.link} >
				<p className="info-time">{info.iconUrl}</p>
				<div className="info-content"><p>{info.content}</p></div>
			</a>
        );
      });
		return (
			<div className='infoList'>
				{ MyInfoList }
			</div>
			);
	}
}
 