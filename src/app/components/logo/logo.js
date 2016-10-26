import React from 'react';
import './logo.scss';
import logoImage from '../../images/logo.png';
//http://img1.imgtn.bdimg.com/it/u=2702594514,2090741741&fm=21&gp=0.jpg
class Logo extends React.Component{
  render() {
    return (
      <div className="Logo">
        <img className="Logo_img" src={logoImage} />
      </div>
    );
  }
}

export default Logo;
