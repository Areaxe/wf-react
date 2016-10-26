import React from 'react';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import DocumentTitle from 'react-document-title';
import WHomeInfo from '../../components/WHomeInfo/WHomeInfo.js';
import fwc from '../../images/fuwuchuang.png';
import { Affix } from 'antd';
import Loading from '../../components/Shade/Loading'

class StoreList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isfirst: true,
    }
  }

  componentWillMount() {
    let states = this.props.states;
    if (!states.stores.storeList) {
      let reginId = states.project.region._id
      this.props.actions.getShopList(reginId)
    }
  }

  componentWillReceiveProps(nextProps) {
    let states = this.props.states;
    if (!states.stores.storeList && this.state.isfirst) {
      let reginId = states.project.region._id
      this.props.actions.getShopList(reginId)
    }
    this.setState({
      isfirst: false,
    })
  }
  getGoodsList(storeId) {
    let states = this.props.states
    if (states.stores) {
      this.props.actions.shopGoodsList(storeId)
    }
  }

  render() {
    let states = this.props.states
    let storeList = []
    let bannerList = states.stores.bannerList ? states.stores.bannerList : []
    let bannerInfo = ''
    if (bannerList && bannerList.length) {
      bannerInfo = <ImageGallery banner={bannerList}></ImageGallery>
    }
    let storeDatas = states.stores.storeList
    if (storeDatas && storeDatas.length) {
      for (let storeData of storeDatas) {
        storeList.push({
          logo: storeData.logo.url + '@152h_152w_1e_1c',
          goodsCount:storeData.goodsCount,
          address: storeData.address,
          name: storeData.name,
          id: storeData._id,
        })
      }
    }
    let detailHeadSetting = {
      tip: '服务窗',
      imgLink: fwc,
    };
    let imgStyle = {
      width: '1.8rem',
      height: '1.8rem',
      verticalAlign: 'middle',
      marginRight: '.4rem',
    }
    if (storeDatas) {
      return (
        <DocumentTitle title='新鲜库'>
          <div>
            <div className='storeList'>
              {bannerInfo}
              {
                storeList.map((val, i) => {
                  let linkTo = `#/goodsList/${val.id}`
                  return <a className='wHome-info-link' onClick={this.getGoodsList.bind(this, val.id)} href={linkTo} key={i} >
                    <WHomeInfo type='proNum' info={val}></WHomeInfo></a>
                })
              }
            </div>
          </div>
        </DocumentTitle>
      );
    } else {
      return <DocumentTitle title='新鲜库'><Loading /></DocumentTitle>
    }

  }
}

export default StoreList;

