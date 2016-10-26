import React from 'react';
import pic from '../../images/act1.jpeg';
import { Icon, Rate } from 'antd';
import './WHomeInfo.scss';

import tel_28 from '../../images/phone3x.png';
import address_28 from '../../images/dizhi.png';
import prod_num_28 from '../../images/zhonglei.png';

class WHomeInfo extends React.Component {
  render() {
    let props = this.props;
    if (props.type === 'arrows') {   //显示有右箭头的
      return (
        <div className="whome_info_container">
          <table className="whome_info_table">
            <tbody>
              <tr>
                <td rowSpan="3" className="whome_info_picTd"><img className="whome_info_pic" src={this.props.info.logo} /></td>
                <td className="whome_info_shopName whome_info_none">{this.props.info.name}</td>
                <td rowSpan="3" className="whome_info_iconTd"><Icon className="whome_info_icon" type="right"></Icon></td>
              </tr>
              <tr>
                <td className="whome_info_phone"><img className="whome_info_icon" src={tel_28} />&nbsp;{this.props.info.phone}</td>
              </tr>
              <tr>
                <td className="whome_info_address whome_info_none"><img className="whome_info_icon" src={address_28} />&nbsp;{this.props.info.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (props.type === 'onlyTitle') {    //中间只显示妇女之家名称
      return (
        <div className="whome_info_container">
          <table className="whome_info_tabTitle">
            <tbody>
              <tr>
                <td className="whome_info_picTd2"><img className="whome_info_pic2" src={pic} /></td>
                <td className="whome_info_shopName2 whome_info_none">从化区太平镇妇女之家</td>
                <td className="whome_info_iconTd2"><Icon className="whome_info_icon2" type="right"></Icon></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (props.type === 'proNum') {   //显示有产品数量的
      return (
        <div className="whome_info_container">
          <table className="whome_info_table">
            <tbody>
              <tr>
                <td rowSpan="3" className="whome_info_picTd"><img className="whome_info_pic" src={this.props.info.logo} /></td>
                <td className="whome_info_shopName whome_info_none">{this.props.info.name}</td>
              </tr>
              <tr>
                <td className="whome_info_phone whome_info_proNum"><span style={{ height: '2.3rem', lineHeight: '2.3rem' }}><img className="whome_info_icon" src={prod_num_28} /></span>新鲜种类<span className="whome_info_numAddress">{this.props.info.goodsCount}</span></td>
              </tr>
              <tr>
                <td className="whome_info_address whome_info_none"><img className="whome_info_icon" src={address_28} />新鲜定位<span className="whome_info_numAddress">{this.props.info.address}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (props.type === 'detail') {  //显示地址的完整信息
      return (
        <div className="whome_info_container">
          <table className="whome_info_table">
            <tbody>
              <tr>
                <td rowSpan="3" className="whome_info_picTd"><img className="whome_info_pic" src={this.props.info.logo} /></td>
                <td className="whome_info_shopName whome_info_none">{this.props.info.name}</td>
              </tr>
              <tr>
                <td className="whome_info_phone"><img className="whome_info_icon" src={tel_28} />{this.props.info.phone}</td>
              </tr>
              <tr>
                <td className="whome_info_address"><img className="whome_info_icon" src={address_28} />{this.props.info.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else if (props.type === 'star') {  //显示有评星的
      return (
        <div className="whome_info_container">
          <table className="whome_info_table">
            <tbody>
              <tr>
                <td rowSpan="3" className="whome_info_picTd"><img className="whome_info_pic" src={this.props.info.logo} /></td>
                <td className="whome_info_shopName whome_info_none">{this.props.info.name}</td>
                <td className="whome_info_starTd"><Rate disabled allowHalf value={this.props.info.star} /></td>
              </tr>
              <tr>
                <td colSpan="2" className="whome_info_phone"><img className="whome_info_icon" src={tel_28} />{this.props.info.phone}</td>
              </tr>
              <tr>
                <td colSpan="2" className="whome_info_address whome_info_none"><img className="whome_info_icon" src={address_28} />{this.props.info.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default WHomeInfo;

