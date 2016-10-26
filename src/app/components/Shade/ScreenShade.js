// import EventEmitter from 'eventemitter3';
import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './ScreenShade.scss';

export default class ScreenShade extends Component{
 	constructor(props){
    	super(props);
	    this.state = {
	      	showShade: 'block',
	    };
  }
  _onTouchMove(e){
  		e.preventDefault();
  }
 /* componentDidMount(){
  	
  		window.onResize = this._onResize; 
  }
  
  _onResize(){
  	// this.refs.shade
  	this.refs.shade.style.height = '130vh';
  	console.log(this.refs.shade.style.height);
  }*/
	render(){
		let content;
		switch(this.props.type){
			case 'top':
				content = <div className='content-top'>{ this.props.children }</div>
				break;
			case 'center':
				content = <div className='content-center'>{ this.props.children }</div>
				break;
			case 'bottom':
				content = <div className='content-bottom'>{ this.props.children }</div>
				break;
			default:
				content = <div className='content-center'>{ this.props.children }</div>
		}

		return (
			<div className='screenShade'ref='shade' onTouchMove={this._onTouchMove.bind(this)} style={{display:this.state.showShade}}>
				<div className="screen" ></div>
				{ content }
			</div>
			);
		}
}
 