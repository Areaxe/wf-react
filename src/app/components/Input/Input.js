import React, { Component, PropTypes } from 'react';
import ReactDOM , {findDOMNode} from 'react-dom';
import styles from './Input.scss';

export default class Input extends Component{

  constructor(props){
    super(props);
    this.state = {
      showDelBtn: 'none',
    };
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
      let inputElm = ReactDOM.findDOMNode(this.refs.input).value.trim();
        this.setState({
            showDelBtn: 'none',
        })
        if(inputElm){
            this.setState({
              showDelBtn: 'block',
          });
        }
    }
  clearText(clearName){
      switch(clearName){
          case 'input':
          this.setState({
            showDelBtn: 'none',
          });
            ReactDOM.findDOMNode(this.refs.input).value = '';
              break;
          default:
          this.setState({
            showDelBtn: 'none',
          });
            ReactDOM.findDOMNode(this.refs.input).value = '';
              break;
      }
    }

  render(){
    let classnames;
    const type = this.props.type;
    switch(type){
      case 'search':
      return (
        <div className='input'>
          <div className='search-container'>
            <input className='search-input' onChange = { this._onChange.bind(this) } ref='input' type='search' />
            <span className='delBtn' style={{display:this.state.showDelBtn}} onClick={this.clearText.bind(this,'input')}></span>
          </div>
          
        </div>
        );
      break;

      default:
        return(
          <div className='input' >
            <div className={ classnames }>
              <div className='left' ></div>
              <div className='center' >
                <input ref='input' placeholder={ this.props.defaultText }/>
              </div>
              <span className='delBtn' style={{display:this.state.showDelBtn}} onClick={this.clearText.bind(this,'phone')}></span>
            </div>
          </div>
      );
    break;
    }
    
  }
}