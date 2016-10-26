import React from 'react';
import { Link } from 'react-router';
import './Menu.scss';
import ReactDOM, { findDOMNode } from 'react-dom';

class Menu extends React.Component {
  componentWillMount() {

  }
  constructor(props) {
    super(props);
    this.state = {
      current: 'home',
    }
  }
 
  render() {
    let items = [
      {
        'name': '首页',
        'index': 0,
        'icon': 'home-icon',
        'link': '/',
      },
      {
        'name': '妇女之家',
        'index': 1,
        'icon': 'whome-icon',
        'link': '/women',
      },
      {
        'name': '消息',
        'index': 2,
        'icon': 'info-icon',
        'link': '/message',
      },
      {
        'name': '个人中心',
        'index': 3,
        'icon': 'pcenter-icon',
        'link': '/personal',
      },
    ]
    let _this = this
    return (
      <ul className="menu_bottom_ul" style={{ width: '100%' }}>
        {
          items.map(function (v, i) {
            return (
              <li key={i} className={parseInt(_this.props.index) === v.index ? `menu-item active ${v.icon}-at` : `menu-item ${v.icon}`}>
                <Link to={v.link}><p>{v.name}</p></Link>
              </li>
            )
          })
        }
      </ul>
    );
  }
}

export default Menu;