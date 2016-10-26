import config from '../config.js'
import {fetchData} from './fetchData'

export const NEWS_FETCH = 'NEWS_FETCH'
export function newsFetch(regionId, type, sort) {
  return dispatch => {
    return fetchData({url:`${config.API_GET_DATA}/${regionId}/news?populate="cover newsType"&eq="newsType=${type}"&sort=-${sort}`}).then((response) => {               // 根据新闻类型和排序来获取新闻信息
      return response
    }).then((news)=> {
      dispatch({
        type: NEWS_FETCH,
        json: {
          data: news.result.data,
        },
      })
    }).catch((err)=> {
      console.error(err)
    })
  }
}

export const NEWS_DETAIL = 'NEWS_DETAIL'
export function newsDetails(newsId) {
  return dispatch => {
    return fetchData({url:`${config.API_NEWS}/${newsId}?populate="cover organizer newsType"`}).then((response) => {                    // 获取新闻详情
      return response
    }).then((news)=> {
      dispatch({
        type: NEWS_DETAIL,
        json: news.result.data[0],
      })
    }).catch((err)=> {
      console.error(err)
    })
  }
}

export const UPDATE_COUNT = 'UPDATE_COUNT'
export function updateCount(newsId) {
  return dispatch => {
    return fetchData({url:`${config.API_NEWS}/${newsId}/read`}).then((response) => {                 // 更新新闻访问量
      return response
    }).then((news)=> {
      dispatch({
        type: UPDATE_COUNT,
        json: {
          data: news.result.data,
        },
      })
    }).catch((err)=> {
      console.error(err)
    })
  }
}

export const NEWS_LIKE = 'NEWS_LIKE'
export function newsLike(newsIds, newsId, newsDetail) {
  let token = localStorage.getItem('login_token')
  let userId = localStorage.getItem('acct_userId')
  return dispatch => {
    return fetchData(
      {
        url:`${config.API_NEWS}/${newsId}/up`,
        type: "POST",
        token: token,
      }).then((response) => {                 // 新闻点赞
      return response
    }).then((news)=> {
      dispatch({
        type: NEWS_LIKE,
        json: {
          data: news.result,
          newsIds: newsIds,
          newsId: newsId,
          news: newsDetail,
          userId: userId,
        },
      })
    }).catch((err)=> {
      console.error(err)
    })
  }
}