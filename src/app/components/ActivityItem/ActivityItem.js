import React, {Component,Link} from 'react';
import Styles from './ActivityItem.scss';

class ActivityItem extends Component {
  render() {
    return (
      <div className='ActivityItem' bodyStyle={{ padding: 0 }}>
        <div className='custom-image'>
          <a href={this.props.link}><img alt={this.props.alt} width="100%" src={this.props.src}/></a>
        </div>
      </div>
    )
  }
}

export default ActivityItem;


