import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './GoodsItem.scss';

export default class GoodsItem extends Component{

	render(){		
		return (
			<div className='goods-item'>
				<p className='goods-img'>
					<img src={this.props.data.imgUrl} />
				</p>
				<div className='goods-name-out'>
					<p className='goods-name'>
						{this.props.data.goodsName}
					</p>
				</div>
			</div>
			);
	}
}
 