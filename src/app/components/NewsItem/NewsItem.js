import React from 'react';
import ServerHead from '../ServerHead/ServerHead';
import './NewsItem.scss';
import { Link } from 'react-router';

class NewsItem extends React.Component {

  changeDate(date) {
    let newDate = new Date(date * 1)
    return newDate.getFullYear()+'年'+(newDate.getMonth()+1)+'月'+newDate.getDate()+'日'
  }

  render() {
    let props = this.props;
    let item = props.item;
    
    if(item.newsType === 'big'){
      return (
        <Link to={"/news/"+item.newsId}>
          <ul className="news_big_container">
            <li className="news_big_title">{item.title}</li>
            <li className="news_big_imgLi">
              <img className="news_big_img" src={item.imgUrl} />
            </li>
            <li className="news_big_show">
              <span>{item.owner}</span>
              <span>{item.like}</span>
              <span>{this.changeDate(item.time)}</span>
            </li>
          </ul>
        </Link>
      );
    }else if(item.newsType === 'small'){
      return (
        <Link to={"/news/"+item.newsId}>
          <div className="news_small_container">
            <ul className="news_small_ul">
              <li className="news_small_title">{item.title}</li>
              <li className="news_small_show">
                <span>{item.owner}</span>
                <span>{item.like}</span>
                <span>{this.changeDate(item.time)}</span>
              </li>
            </ul>
            <div className="news_small_imgDiv">
              <img className="news_small_img" src={item.imgUrl} />
            </div>
          </div>
        </Link>
      );
    }
  }
}

export default NewsItem;

