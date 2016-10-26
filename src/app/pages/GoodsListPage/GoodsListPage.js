import React, { Component, PropTypes } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import { Affix, Tabs } from 'antd'

import GoodsItem from '../../components/GoodsItem/GoodsItem'
import ServiceList from '../../components/ServiceList/ServiceList'
import WHomeInfo from '../../components/WHomeInfo/WHomeInfo'
import TopMenu from '../../components/TopMenu/TopMenu'
import DocumentTitle from 'react-document-title'
import NoGoods from '../../components/NoInfo/NoInfo'
import noGoodsImg from '../../images/no-goods.png'
import style from './GoodsListPage.scss'
import Loading from '../../components/Shade/Loading'

export default class GoodsListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isfirst: true,
        }
    }

    componentWillMount() {
        let states = this.props.states
        if (!states.stores || !states.stores.goodsList) {
            let storeId = this.props.params._storeId
            this.props.actions.shopGoodsList(storeId)
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        let states = this.props.states
        if (!states.stores || !states.stores.goodsList && this.state.isfirst) {
            let storeId = this.props.params._storeId
            this.props.actions.shopGoodsList(storeId)
        }
        this.setState({
            isfirst: false,
        })
    }
    _LinkTo(link) {
        window.location.href = link;
    }

    render() {
        let shopInfo = {}
        let stores = this.props.states.stores
        let goodsList = []
        if(stores.goodsList){
            stores.goodsList.map(val=>{
            if(val.status === 'saling'){
                goodsList.push(val)
            }
        })
        }
        
        let curShop = this.props.params.storeId
        if (stores.shopInfo && typeof stores.shopInfo === 'object') {
            let shopData = stores.shopInfo[0]
            shopInfo = {
                name: shopData.name,
                address: shopData.address,
                phone: shopData.phone,
                logo: shopData.logo.url + '@152h_152w_1e_1c',
                introduction: shopData.describtion,
            }
        }

        // for(let shopData of stores.storeList){
        //   if(curShop.match(shopData._id)){
        //     shopInfo = {
        //         name:shopData.name,
        //         address:shopData.address,
        //         phone:shopData.phone,
        //         logo:shopData.cover.url,
        //         introduction:shopData.introduction,
        //     }
        //   }
        // }

        const TabPane = Tabs.TabPane;
        if (goodsList) {
            let goodsDatas = goodsList.map((goods, i) => {
                return {
                    imgUrl: goods.cover.url + '@260h_260w_1e_1c',
                    goodsName: goods.title,
                    id: goods._id,
                }
            })
            if (goodsList.length) {
                return (
                    <DocumentTitle title='新鲜货架'>
                        <div className='goods-list'>
                            <div className='business-info'>
                                <WHomeInfo type='detail' info={shopInfo} ></WHomeInfo>
                            </div>
                            <div className='goods-tab'>
                                <Tabs>
                                    <TabPane tab="产品列表" key="1">
                                        <div className='goods-list-ul'>
                                            <ul>
                                                {
                                                    goodsDatas.map((goodsInfo, i) => {
                                                        let linkTo = `#/goods/${this.props.params._storeId}/${goodsInfo.id}`
                                                        return <li key={i} onClick={this._LinkTo.bind(this, linkTo)} className='goodsItem' ><GoodsItem data={goodsInfo}></GoodsItem></li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="商家介绍" key="2">
                                        <div className="business-introduce">{shopInfo.introduction}</div>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                    </DocumentTitle>
                )
            }
            else {
                return (
                    <DocumentTitle title='新鲜货架'>
                        <div className='goods-list'>
                            <div className='business-info'>
                                <WHomeInfo type='detail' info={shopInfo} ></WHomeInfo>
                            </div>
                            <div style={{ height: 'calc(100vh - 24rem)' }}>
                                <NoGoods img={noGoodsImg} text="新鲜的宝贝正在赶路…" ></NoGoods>
                            </div>
                        </div>
                    </DocumentTitle>
                )
            }
        } else {
            return (
                <DocumentTitle title='新鲜货架'>
                    <Loading />
                </DocumentTitle>
            )
        }

    }
}

