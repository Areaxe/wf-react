import config from '../config.js'
import {fetchData} from './fetchData.js'


//获取商店列表action
export const INIT_SHOPACTION = 'INIT_SHOPACTION'

export function getShopList(regionId) {
  return dispatch => {
     storeListFetch().then(storeList => {
      bannerFetch(regionId).then(busBanner => {
        dispatch({
          type: INIT_SHOPACTION,
          data: {
            storeList: storeList.result.data,
            busBanner: busBanner.result.data,
          },
        })
      })
    })
  }
}


//商品列表action
export const SHOP_GOODSLIST = 'SHOP_GOODSLIST'
export function shopGoodsList(shopId) {
  return dispatch => {
    let goodsList = goodsListFetch(shopId)
    goodsListFetch(shopId).then(goodsList => {
      shopInfoFetch(shopId).then(shopInfo => {
        dispatch({
          type: SHOP_GOODSLIST,
          data: {
            isfirst: false,
            shopInfo: shopInfo.result.data,
            goodsList: goodsList.result.data,
          },
        })
      })
    })
  }
}

//商品详情页面action
export const SHOP_GOODS_DETAIL = 'SHOP_GOODS_DETAIL'
export function detailGoodsInfo(shopId, goodsId) {
  return dispatch => {
    shopInfoFetch(shopId).then((shopInfo) => {
      goodsDetailfetch(goodsId).then((goodsInfo) => {
        dispatch({
          type: SHOP_GOODS_DETAIL,
          data: {
            shopInfo: shopInfo.result.data,
            goodsInfo: goodsInfo.result.data,
          },
        })
      })
    })
  }
}


//获取商店列表
function storeListFetch(){
  let regionId = localStorage.getItem('region_id')
   return fetchData({
      url:`${config.API_GET_DATA}/${regionId}/organizers?eq="type=business"`,
    }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}

//获取商店信息
function shopInfoFetch(shopId) {
  return fetchData({
    url:`${config.API}/organizer/${shopId}?eq="type=business"&populate="cover"`,
  }).then((response) => {
    return response
  })
}
//获取商店banner
function bannerFetch() {
  let regionId = localStorage.getItem('region_id')
  return fetchData({
    url: `${config.API_GET_DATA}/${regionId}/banner?eq="type=business"&populate="resource"`,
  }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}

//获取商店列表信息
function shopListFetch(regionId) {
  return fetch(`${config.API_GET_DATA}/${regionId}/shop`).then((response) => {
    return response.json()
  })
}

//获取商品列表
function goodsListFetch(shopId) {
  return fetchData({
    url: `${config.API}/organizer/${shopId}/goods?populate="cover"`,
  }).then((response) => {
    return response
  })
}

//获取商品详情
function goodsDetailfetch(goodsId) {
  return fetchData({
    url: `${config.API}/goods/${goodsId}?populate="cover"`,
  }).then((response) => {
    console.log(response)
    return response
  })
}


