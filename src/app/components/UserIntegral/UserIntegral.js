import React, { Component, PropTypes, findDOMNode } from 'react'
import { Modal, Button } from 'antd'
import styles from './UserIntegral.scss'
import jfgz from '../../images/jifenguize@3x.png'
import NoPoint from '../../components/NoInfo/NoInfo'
import noPointImg from '../../images/no-point.png'

function  formateDate(timeStamp) {
    let date = new Date(Number(timeStamp))
	let year = date.getFullYear()
    let month = date.getMonth()>=9?(date.getMonth()+1):'0'+(date.getMonth()+1)
    let day = date.getDate()>10?date.getDate():('0'+date.getDate())
	let hour = date.getHours()
	let min = date.getMinutes()
    return year+'.'+month + '.' + day + '  '+hour+':'+min
  }
export default class UserIntegral extends Component {
	//获取用户积分规则

	_getRule(){
		window.location.href = '#/integralRule'
	}
	render() {
		let integralDatas
		let totalPoint = 0
		let pointDatas = this.props.data
		if (pointDatas&&pointDatas.length) {
			totalPoint = pointDatas[0].user.point
			integralDatas = pointDatas.map((point, i) => {
				let pointItem= Number(point.point)>0?'+'+point.point:point.point
				console.log(pointItem)
				let pointDay = formateDate(Number(point.date))
				return <div className="single-integral" key={i} >
					<div className="integral-info">
						<p className="integral-name">{point.detail}</p>
						<p className="integral-time">{pointDay}</p>
					</div>
					<p className="integral-num">{pointItem}</p>
				</div>
			})

		} else {
			integralDatas = <div className='no-point'><NoPoint img={noPointImg} text="暂无积分" /></div>
		}

		return (
			<div className="user-integral">
				<div className="total-integral">总积分<span className="total-num">{totalPoint}</span><img onClick={this._getRule.bind(this)} className="intergral-icon" src={jfgz} /></div>
				{
					integralDatas
				}
			</div>
		);
	}
}
