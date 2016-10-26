import React, {Component} from 'react';
import { Link } from 'react-router';

import ActivityItem from '../ActivityItem/ActivityItem';
import fwc from '../../images/fuwuchuang@3x.png';
import xwy from '../../images/xinwenyan@3x.png';
import xxk from '../../images/xinxianku@3x.png';
import xsx from '../../images/xinshijia@3xx.png';

import Styles from './ActivityList.scss';

class ActivityList extends Component {
  render() {
    return (
      <div className='ActivityList'>
        <Link to="/service">
          <div className="act_service_container act_main-container">
            <ul className="act_service_ul">
              <li className="act_service_content">服务窗</li>
              <li className="act_service_picLi"><img className="act_service_pic" src={fwc} /></li>
            </ul>
          </div>
        </Link>
        <Link to="/news">
          <div className="act_news_container act_main-container">
            <ul className="act_service_ul">
              <li className="act_service_content">新闻眼</li>
              <li className="act_service_picLi"><img className="act_service_pic" src={xwy} /></li>
            </ul>
          </div>
        </Link>
        <Link to="/stores">
          <div className="act_fresh_container act_main-container">
            <ul className="act_service_ul">
              <li className="act_service_content">新鲜库</li>
              <li className="act_service_picLi"><img className="act_service_pic" src={xxk} /></li>
            </ul>
          </div>
        </Link>
        <Link to="/mindBox">
          <div className="act_worry_container act_main-container">
            <ul className="act_service_ul">
              <li className="act_service_content">心事匣</li>
              <li className="act_service_picLi"><img className="act_service_pic" src={xsx} /></li>
            </ul>
          </div>
        </Link>
      </div>
    )
  }
}

export default ActivityList;


