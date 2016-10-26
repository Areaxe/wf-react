import React from 'react'
import DocumentTitle from 'react-document-title'
import './newsDetail.scss'
import CenterContents from '../../components/CenterContents/Share'
import Shade from '../../components/Shade/ScreenShade'
import {message} from 'antd'

import likeImg from '../../images/dianzan_big_blue@3x.png'
import likeImg1 from '../../images/dianzan_big_blue_down@3x.png'
import shareImg from '../../images/fenxiang_big@3x.png'
import youdao from '../../images/youdaofenxiang.png'

class News extends React.Component {

  _changeDate(date) {
    let newDate = new Date(date * 1)
    return newDate.getFullYear()+'年'+(newDate.getMonth()+1)+'月'+newDate.getDate()+'日'
  }

  constructor(props) {
    super(props);
    this.state = {
      newsDetails: null,
      showShade: false,
    };
    this._shareClick = this._shareClick.bind(this)
    this._likeClick = this._likeClick.bind(this)
    this._closeHandle = this._closeHandle.bind(this)
  }

  _hasItem(arr, str) {
    let bool = false
    for(let it in arr) {
      if(arr[it] === str) {
        bool = true
        break
      }
    }
    return bool
  }

  _shareClick() {
    this.setState({
      showShade: true,
    })
  }

  _likeClick() {
    if(this._hasItem(this.props.states.news.newsDetails.ups,this.props.states.project.userId)) {
      message.info('已经点过赞了哟！');
    }else if(this._hasItem(this.props.states.news.arr, this.props.params._id)) {
      message.info('已经点过赞了哟！');
    }else {
      this.props.actions.newsLike(this.props.states.news.arr, this.props.params._id, this.props.states.news.newsDetails)
    }
  }

  _closeHandle() {
    this.setState({
      showShade: false,
    })
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillMount() {
    this.props.actions.updateCount(this.props.params._id)
    this.props.actions.newsDetails(this.props.params._id)
  }

  componentWillUnmount() {
  }

  render() {

    let showInfo = ''
    if(this.state.showShade) {
      showInfo = <Shade type="top"><div onClick={this._closeHandle.bind(this)} className="newsDetail_youDao_div"><img onClick={this._closeHandle.bind(this)} className="newsDetail_youDao_img" src={youdao} /></div></Shade>
    }else {
      showInfo = ''
    }

    let news = this.props.states.news.newsDetails

    if(news !== null) {
      let item = {
        title: news.title,
        imgUrl: '',
        owner: news.organizer.name,
        like: news.praise ? news.praise + '赞' : 0 +'赞',
        time: news.date,
        newsType: 'detail',
      }

      let zan = <span><img className="newsDetail_button_icon" src={likeImg} />点赞</span>
      if(this._hasItem(this.props.states.news.arr, this.props.params._id) || this._hasItem(news.ups,this.props.states.project.userId)) {
        zan = <span><img className="newsDetail_button_icon" src={likeImg1} />已点赞</span>
      }

      return (
        <DocumentTitle title='新闻详情'>
          <div className="newsDetail_div_container">
            <p className="newsDetail_p_title">{item.title}</p>
            <div className="newsDetail_div_spans">
              <span>{item.owner}</span>
              <span>{item.like}</span>
              <span>{this._changeDate(item.time)}</span>
            </div>
            <div className="news_div_content" dangerouslySetInnerHTML={{__html: news.content}} ></div>
            <div className="newsDetail_div_buttons">
              <button className="newsDetail_button_like" onClick={this._likeClick.bind(this)}>{zan}</button>
              <button className="newsDetail_button_share" onClick={this._shareClick.bind(this)}><img className="newsDetail_button_icon" src={shareImg} />分享</button>
            </div>
            {showInfo}
          </div>
        </DocumentTitle>
      );
    }else {
      return (
        <div className="loadding-text-common">
          数据正在加载中...
        </div>
      )
    }
  }
}

export default News;

