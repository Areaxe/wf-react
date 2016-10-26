import React, {Component} from 'react';
import './AddressInfo.scss';
import {Icon} from 'antd';

import address_28 from '../../images/adress_28_org.png';
import tel_64 from '../../images/tel@3x.png';

class AddressInfo extends Component {
  _showPhonePage(e) {
    if (this.props.showCall) {
      this.props.showCall(e);
    }
  }

  render() {
    let type = this.props.type;
    let info;
    if (type === 'all') {
      info =
        <td className="address_info_detailLi"><span className="address_info_detailAll">{this.props.data.address}</span>
        </td>;
    } else {
      info =
        <td className="address_info_detailLi"><span className="address_info_detail">{this.props.data.address}</span>
        </td>;
    }
    return (
      <table className="address_info_table">
        <tbody>
        <tr>
          <td className="address_info_iconTd"><img className="address_info_icon2" src={address_28}/></td>
          {info}
          <td className="address_info_phoneTd" onClick={this._showPhonePage.bind(this)}>
            <div className="address_info_line"><img className="address_info_phone" src={tel_64}/></div>
          </td>
        </tr>
        </tbody>
      </table>
    )
  }
}

export default AddressInfo;