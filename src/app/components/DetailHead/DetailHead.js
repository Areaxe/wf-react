import React from 'react';
import './DetailHead.scss';

class DetailHead extends React.Component {
  render() {
    let sheet = this.props.sheet;
    let info = this.props.info;
    return (
      <table className="detail_head_table">
        <tbody>
          <tr>
            <td className="detail_head_ImgTd"><img style={sheet} className="detail_head_icon" src={info.imgLink} /></td>
            <td className="detail_head_tip">{info.tip}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default DetailHead;

