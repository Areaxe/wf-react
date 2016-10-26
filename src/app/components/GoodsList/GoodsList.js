import React, { Component, PropTypes, findDOMNode } from 'react';
import GoodsItem from '../GoodsItem/GoodsItem.js';
import style from './GoodsList.scss';
import img from '../../images/act1.jpeg';
export default class GoodsList extends Component{
	render(){
		let goodsData = 
		[{
			imgUrl:img,
			goodsName:"当 当 网途牛旅网途牛旅游网房游网房",
		},{
			imgUrl:img,
			goodsName:"汽车之家易 网途牛旅",
		},{
			imgUrl:img,
			goodsName:"汽车之家易 车 网太平洋汽车安 居 客折800苏宁手机驴妈妈旅游百度•热搜赶 集 网当 当 网途牛旅游网1 号 店珍爱婚恋网乐居二手房",
		},{
			imgUrl:img,
			goodsName:"汽车之家易 车 网太平洋汽车安 居 客折800苏宁手机驴妈妈旅游百度•热搜赶 集 网当 当 网途牛旅游网1 号 店珍爱婚恋网乐居二手房",
		}];
		// let arr = [];
		// for(let obj of goodsData){
		// 	arr.push(
		// 		<GoodsItem data={obj} ></GoodsItem>
		// 	);
		// }
		return (<div className='goods-list'>
					<ul>
						{goodsData.map((list,i) => {
							return <GoodsItem key={i} idata={ list }></GoodsItem>
						})}
					</ul>
				</div>
			);
	}
}
 