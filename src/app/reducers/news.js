import Immutable from 'immutable'
import {
  createReducer,
}
  from 'redux-immutablejs'

import * as NewsAction from '../actions/newsaction.js'
import {message} from 'antd'

const initialState = Immutable.fromJS({
  newsDetails: null,
  arr:[],
})


export default createReducer(initialState, {
  [NewsAction.NEWS_FETCH]: (NewsStatus, action) => {
    return NewsStatus.merge({
      newsInfo: action.json.data,
    })
  },
  [NewsAction.NEWS_DETAIL]: (NewsStatus, action) => {
    return NewsStatus.merge({
      newsDetails: action.json,
    })
  },
  [NewsAction.NEWS_LIKE]: (NewsStatus, action) => {
    let arr = action.json.newsIds
    let newsDetail = null
    if (action.json.data.code === 200) {
      arr.push(action.json.newsId)
      newsDetail = action.json.news
      newsDetail.praise += 1
      message.info('点赞成功！')
    }else {
      message.error(action.json.data.message)
    }
    return NewsStatus.merge({
      arr: arr,
      newsDetails: newsDetail,
    })
  },
})