import React from 'react';
import DocumentTitle from 'react-document-title';
import AddressInfo from '../../components/AddressInfo/AddressInfo';
import WHSList from '../../components/WHSList/WHSList';
import Gallery from '../../components/Gallery/Gallery';
import {Rate} from 'antd';
import {Link} from 'react-router'
import './WHDetail.scss';
import Shade from '../../components/Shade/ScreenShade';
import Call from '../../components/CenterContents/Call';
import Loading from '../../components/Shade/Loading'

class WHDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCall: false,
      whomePhone: '',
      isfirst : true,
    };
  }
  componentWillMount() {
    if (!this.props.states.federation.whomeInfo) {
      let whomeId = this.props.params._whomeId
      this.props.actions.whomeDetail(whomeId)
    }
  }
  componentWillReceiveProps(){
    if (!this.props.states.federation.whomeDetailInfo && this.state.isfirst) {
      let whomeId = this.props.params._whomeId
      this.props.actions.whomeDetail(whomeId)
    }
    this.setState({
      isfirst:false,
    })
  }

  _showCallPage(e) {
    e.preventDefault()
    this.setState({
      showCall: true,
    })
  }
  _cancleCall() {
    this.setState({
      showCall: false,
    })
  }
  _callPhone(phoneNum) {
    window.location.href = "tel:" + phoneNum
  }
  _getPosition(lng, lat) {

  }
  render() {
    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    let federation = this.props.states.federation
    let whomeDetails = federation.whomeDetailInfo

    if (federation && whomeDetails) {
      let whomeDetail = whomeDetails[0]
      let hotCommentData = whomeDetail.hotComments
      let whomeId = whomeDetail._id
      let newService = federation.newService
      let oldService = federation.oldService
      let pictureList = []
      whomeDetail.pictures.map((picture, i) => {
        pictureList.push(
          picture.url + '@300h_300w_1e_1c'
        )
      })
      
      const IMAGE_NAMES = pictureList
      const IMAGE_BIG_NAMES = pictureList
      const IMAGE_MAP = IMAGE_NAMES.map((img, index) => ({
        src: IMAGE_BIG_NAMES[index],
        thumbnail: img,
      }));

      //判断是否有图片
      let imgList = ''
      if(IMAGE_NAMES.length)
      imgList =  <Gallery images={IMAGE_MAP} />
      else
      imgList = ''

      let showCallText = ''
      if (this.state.showCall) {
        showCallText = <Shade type='bottom'><Call cancleCall={this._cancleCall.bind(this) } callPhone={this._callPhone.bind(this, whomeDetail.phone) }></Call></Shade>
      }

      return (
        <DocumentTitle title="妇女之家详情">
          <div className='whome-detailPage' style={{ backgroundColor: '#f4f5f7', width: '100%' }}>
            <ul className="whd_head_ul">
              <li className="whd_head_name">{whomeDetail.name}</li>
              <li className="whd_head_rate"><Rate disabled allowHalf value={whomeDetail.star} /></li>
            </ul>
            <Link to={`/whomeMap/${whomeId}`} >
              <AddressInfo type="123" data={whomeDetail} showCall={this._showCallPage.bind(this) }></AddressInfo>
            </Link>
            {imgList}
            <WHSList key='0' type="new" newService={newService} whomeId={this.props.params._whomeId}></WHSList>
            <WHSList key='1' type="old" oldService={oldService} whomeId={this.props.params._whomeId}></WHSList>
            <WHSList key='2' type="comment" commentData={hotCommentData} limit='2' whomeId={this.props.params._whomeId}></WHSList>
            {showCallText}
          </div>
        </DocumentTitle>
      );
    }
    else {
      return <div className="loadding-text-common"><Loading /></div>
    }
  }
}

export default WHDetail;

