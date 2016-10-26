// import EventEmitter from 'eventemitter3';
import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './PersonalInfo.scss';

import nickName_icon from '../../images/nickname.png';
import phone_icon from '../../images/phone_28.png';
import address_icon from '../../images/adress_28_org.png';

export default class PersonalInfo extends Component{
 
	render(){
		let personalInfo = {}
		if(this.props.data){
			 personalInfo = this.props.data
		}
		

		const PersonInfoDatas = [
			{
				field:'昵称',
				link:"#/changeName",
				iconUrl:nickName_icon,
				value:personalInfo.nickname?personalInfo.nickname:'',
			},{
				field:'手机',
				link:"#/changePhone",
				iconUrl:phone_icon,
				value:personalInfo.phone?personalInfo.phone:'',
			},{
				field:'地址',
				link:"#/changePosition",
				iconUrl:address_icon,
				value:personalInfo.address?personalInfo.address:'暂无',
		}];
		
		let PersonInfoList = PersonInfoDatas.map(function (info,i) {
        return (
          	<a className="single-info" href={info.link} key={i} >
				<div className="info-icon"><img src={info.iconUrl} /></div>
				<div className="info-key"><p>{info.field}</p></div>
				<div className="info-value"><p>{info.value}</p></div>
			</a>
        );
      });
		return (
			<div className='PersonalInfo'>
				<div className="personInfo-list">
					{ PersonInfoList }
				</div>
				
			</div>
			);
		}
}
 