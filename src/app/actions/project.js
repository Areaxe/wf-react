import config from '../config.js'
import {fetchData} from './fetchData'

export const INIT_FETCH = 'INIT_FETCH'
export function initFetch(cb) {
  return dispatch => {
    return fetch(config.API_REGION).then((response) => {                               // 获取区域信息，包括 regionId
      return response.json()
    }).then((stories) => {
      let regionId = stories.result.data[0]._id
      tokenFetch('aaabbbccc', regionId).then((token) => {
        localStorage.setItem('login_token', token.result.data.accessToken);
        localStorage.setItem('acct_userId', token.result.data._id);
        localStorage.setItem('region_id', stories.result.data[0]._id);
        getUser(token.result.data._id).then((u) => {
          bannerFetch(regionId).then((banner) => {
            indexNewsFetch(regionId).then((news) => {
              moduleFetch(regionId).then((module) => {
                dispatch({
                  type: INIT_FETCH,
                  json: {
                    region: stories.result.data[0],
                    banner: banner.result.data,
                    news: news.result.data,
                    module: module.result.data,
                    token: token.result.data.accessToken,
                    userId: token.result.data._id,
                    wxUser: u.result.data[0],
                  },
                })
              }).then(() => {
                if (cb) {
                  cb(regionId)
                }
              })
            })
          })
        })
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const UPDATE_PROJECT_DATA = 'UPDATE_PROJECT_DATA'
export function updateProjectData(regionId) {
  console.log('regionId:-------' + regionId)
  return dispatch => {
    indexNewsFetch(regionId).then((news)=> {
      newsTypeFetch(regionId).then((newsTypes)=> {
        console.info(newsTypes)
        dispatch({
          type: UPDATE_PROJECT_DATA,
          json: {
            isfirst: false,
            news: news.result.data,
            newsTypes: newsTypes.result.data,
          },
        })
      }).catch((err)=> {
        console.error(err)
      })
    })
  }
}

function bannerFetch(regionId) {                                                        // banner 对应首页 banner 图片
  return fetchData({
    url: `${config.API_GET_DATA}/${regionId}/banner?eq="type=main"&populate="resource"`,
  }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}

function moduleFetch(regionId) {                                                        // module 对应首页模块
  return fetchData({
    url: `${config.API_GET_DATA}/${regionId}/module`,
  }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}

function serviceFetch(regionId, userId, token) {                                                        // module 对应首页服务
  return fetchData({
    url: `${config.API_GET_DATA}/${regionId}/services/new?populate="organizer cover tags"`,
    token: token,
  }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}

function indexNewsFetch(regionId) {
  console.log(`${config.API_GET_DATA}/${regionId}/news?populate="cover newsType"&sort="-praise"&limit="5"`)                                                           // news 对应首页新闻内容
  return fetchData({
    url: `${config.API_GET_DATA}/${regionId}/news?populate="cover newsType"&sort="-praise"&limit="5"`,
  }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}

function notificationFetch(userId) {                                                          // news 对应首页消息
  return fetchData({
    url: `${config.API_USER}/${userId}/notifications`,
  }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}

function tokenFetch(openId, regionId) {
  //alert(window.location)
  return fetchData({
    url: `${config.API_ACCOUNT_SIGNIN}/wechat`,
    type: 'POST',
    data: {
      openId: openId,
      regionId: regionId,
    },
  }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}

function newsTypeFetch(regionId) {
  //alert(window.location)
  return fetchData({
    url: `${config.API_GET_DATA}/${regionId}/commonTypes?eq="type=news"`,
    type: 'GET',
    data: {
      regionId: regionId,
    },
  }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}

/**
 * 获取openid
 * @param code
 * @returns {Promise.<T>|*|Promise}
 */
function getOpenId(code) {
  try {
    return fetchData({
      url:`http://www.yanshuang520.com/app/getOpenId?code=${code}`,
    }).then((response) => {
      return response
    }).catch((err)=> {
      console.error(err)
    })
  } catch (e) {
    console.error('获取openid失败！' + e.message);
  }
}

/**
 * 获取微信用户信息
 * @param openid
 * @param accessToken
 * @returns {Promise.<T>|*|Promise}
 */
function getUserInfo(openid, accessToken) {
  try {
    return fetch(`http://www.yanshuang520.com/app/getUserInfo?openid=${openid}&access_token=${accessToken}`).then((response) => {
      return response.json()
    }).catch((err)=> {
      console.error(err)
    })
  } catch (e) {
    console.error('获取openid失败！' + e.message);
  }
}

/**
 * 向后台put用户信息
 * @param userId
 * @param regionId
 * @param user
 * @param token
 * @returns {Promise.<T>|*|Promise}
 */
function putUser(userId, regionId, user, token) {
  console.info('nickname:' + user.nickname)
  let address = user.province? user.province : ' ' + user.city? user.city : ' '
  return fetchData({
    url: `${config.API_USER}/${userId}`,
    type: 'PUT',
    token: token,
    data: {
      regionId: regionId,
      nickname: user.nickname? user.nickname: ' ',
      headimgurl: user.headimgurl? user.headimgurl: ' ',
      address: address,
    },
  }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}

/**
 * 从后台获取用户信息，验证后台是否有该用户信息
 * @param userId
 * @returns {Promise.<T>|*|Promise}
 */
function getUser(userId) {
  return fetchData({
    url: `${config.API_USER}/${userId}`,
  }).then((response) => {
    return response
  }).catch((err)=> {
    console.error(err)
  })
}