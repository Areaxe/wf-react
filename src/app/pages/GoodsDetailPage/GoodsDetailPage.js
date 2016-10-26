import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import WHomeInfo from '../../components/WHomeInfo/WHomeInfo';
import style from './GoodsDetailPage.scss';
import goodsImg from '../../images/800-cats.jpg';
import CusButton from '../../components/Button/CustomButton';
import Shade from '../../components/Shade/ScreenShade';
import SubsComment from '../../components/CenterContents/AddComment';
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import Loading from '../../components/Shade/Loading'

export default class GoodsDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isfirst:true,
    }
  }
  componentWillMount() {
    if (!this.props.states.stores.shopInfo && !this.props.states.goodsInfo) {
      let storeId = this.props.params.curStoreId, goodsId = this.props.params.goodsId
      this.props.actions.detailGoodsInfo(storeId, goodsId)
    }
  }

  componentWillReceiveProps() {
    if (!this.props.states.stores.shopInfo && !this.props.states.stores.goodsInfo && this.state.isfirst) {
      let storeId = this.props.params.curStoreId, goodsId = this.props.params.goodsId
      this.props.actions.detailGoodsInfo(storeId, goodsId)
    }
     this.setState({
      isfirst:false,
    })
  }

  render() {
    let curGoodsInfo
    let goodsId = this.props.params.goodsId //获取当前商品信息
    let stores = this.props.states.stores
    let goodsList = stores.goodsList
    let shopInfo = {}
    let shopData = {}
    if (goodsList) {    //如果商品列表存在
      for (let curGoods of goodsList) { //获取商品数据
        if (goodsId.match(curGoods._id)) {  //筛选出所点击的商品数据
          curGoodsInfo = {
            id: curGoods._id,
            imgUrl: curGoods.cover.url + '@320h_320w_1e_1c',
            title: curGoods.title,
            content: curGoods.content,
            link: curGoods.link,
          }
        }
      }
      if (stores.shopInfo && typeof stores.shopInfo === 'object') { //获取商店信息
        shopData = stores.shopInfo[0]
        shopInfo = {
          name: shopData.name,
          address: shopData.address,
          phone: shopData.phone,
          logo: shopData.logo.url + '@152h_152w_1e_1c',
          introduction: shopData.introduction,
        }
      }
      if (shopInfo && curGoodsInfo) {
        let BottomButton = ''
        if (curGoodsInfo.link && curGoodsInfo.link !== '') {
          BottomButton = <div className='bottom-button'><a href={curGoodsInfo.link}><CusButton>查看</CusButton></a></div>
        }
        return (
          <div className='goods-datail'>
            <div className='goods-panel'>
              <p className='brif-introduce'>{curGoodsInfo.title}</p>
              <p className='goods-img'>
                <img src={curGoodsInfo.imgUrl} />
              </p>
            </div>
            <WHomeInfo type='detail' info={shopInfo}></WHomeInfo>
            <p className='goods-introduce' dangerouslySetInnerHTML={{ __html: curGoodsInfo.content }}></p>
            {BottomButton}
          </div>
        );
      }
    }

    if (stores.shopInfo && stores.goodsInfo) { //如果数据存在
      let curGoods = this.props.states.stores.goodsInfo[0],
        shopData = this.props.states.stores.shopInfo[0],
        curGoodsInfo = {
          id: curGoods._id,
          imgUrl: curGoods.cover.url + '@360h_360w_1e_1c',
          title: curGoods.title,
          content: curGoods.content,
          link: curGoods.link,
        }
      shopInfo = {
        id: shopData._id,
        name: shopData.name,
        address: shopData.address,
        phone: shopData.phone,
        logo: shopData.logo.url + '@152h_152w_1e_1c',
        introduction: shopData.introduction,
      }

      if (shopInfo && curGoodsInfo) {
        let BottomButton = ''
        if (curGoodsInfo.link && curGoodsInfo.link !== '') {
          BottomButton = <div className='bottom-button'><a href={curGoodsInfo.link}><CusButton>查看</CusButton></a></div>
        }
        return (
          <DocumentTitle title="新鲜详情">
            <div className='goods-datail'>
              <div className='goods-panel'>
                <p className='brif-introduce'>{curGoodsInfo.title}</p>
                <p className='goods-img'>
                  <img src={curGoodsInfo.imgUrl} />
                </p>
              </div>
              <Link to={`/goodsList/${shopInfo.id}`}>
                <WHomeInfo type='detail' info={shopInfo}></WHomeInfo>
              </Link>
              <div className="goods-introduce" dangerouslySetInnerHTML={{ __html: curGoodsInfo.content }}></div>
              {BottomButton}
            </div>
          </DocumentTitle>
        );
      }
    }

    else {
      return <DocumentTitle title="新鲜详情">
        <Loading />
      </DocumentTitle>
    }
  }
}

