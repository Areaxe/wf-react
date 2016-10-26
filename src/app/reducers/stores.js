import Immutable from 'immutable'
import {
  createReducer,
}
from 'redux-immutablejs'

import * as shopAction from '../actions/storeaction.js'

const initialState = Immutable.fromJS({
  isfirst: true,
})

export default createReducer(initialState, {
  [shopAction.INIT_SHOPACTION]: (ShopationStatus, action) => {
    return ShopationStatus.merge({
      isfirst: false,
      storeList : action.data.storeList,
      bannerList:action.data.busBanner,
    })
  },
  [shopAction.SHOP_GOODSLIST]: (ShopationStatus, action) => {
  	return ShopationStatus.merge({
      isfirst:false,
  	  goodsList : action.data.goodsList,
      shopInfo:action.data.shopInfo,
    })
  },
  [shopAction.SHOP_GOODS_DETAIL]:(GoodsStatus,action)=>{
    return GoodsStatus.merge({
      goodsInfo:action.data.goodsInfo,
      shopInfo:action.data.shopInfo,
    })
  },
})
