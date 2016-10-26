import React, {Component} from 'react';
import style from './NoInfo.scss'

class NoInfo extends Component {
  render() {
    return (
      <div className="noInfo-com" >
            <div className="center">
                <div className="container">
                    <img className="noInfo-img" src={this.props.img} />
                    <p className="text">
                        {this.props.text}
                    </p>
                </div>
            </div>
      </div>
    );
  }
}

export default NoInfo;


