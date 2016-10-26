import React from 'react';
import ServerHead from '../ServerHead/ServerHead';
import {Link} from 'react-router'

class ServerList extends React.Component {

  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(serviceId, html, signIn) {
    this.props.parentCallback(serviceId, html, signIn)
  }

  render() {
    let InfoDatas = this.props.InfoDatas
    let type = InfoDatas.type
    let services = InfoDatas.info.map((item, index)=> {
      if (type === 'newService' || type === 'service') {
        return (
          <Link key={index} to={`/service/${item._id}`}>
            <ServerHead parentCallback={this._handleClick.bind(this)} key={index} item={{type: type, data:item}}/>
          </Link>
        )
      } else if (type === 'old') {
        return (
          <Link key={index} to={`/oldServiceDetail/${item._id}`}>
            <ServerHead parentCallback={this._handleClick.bind(this)} key={index} item={{type: type, data:item}}/>
          </Link>
        )
      } else {
        return (
          <ServerHead parentCallback={this._handleClick.bind(this)} key={index} item={{type: type, data:item}}/>
        )
      }
    })
    return (
      <div>
        {services}
      </div>
    );
  }
}

export default ServerList;

