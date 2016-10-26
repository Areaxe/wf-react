// import EventEmitter from 'eventemitter3';
import React, { Component, PropTypes, findDOMNode } from 'react';
import styles from './Loading.scss';

export default class Loadding extends Component {

    render() {
        return (
            <div className='loading-component'>
                <div className="loading">
                    <img className="loadding-img" src="http://yjy-rn.oss-cn-shenzhen.aliyuncs.com/balls.svg" />
                    <p className="loadding-text">加载中...</p>                   
                </div>
            </div>
        );
    }
}


