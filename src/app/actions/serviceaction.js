import config from '../config.js'
import {fetchData} from './fetchData'
import docCookies from '../utils/cookie'

export const INIT_SERVICE = 'INIT_SERVICE'

export function initServiceList() {
  let token = localStorage.getItem('login_token')
  return dispatch => {
    serviceListFetch().then(serviceList => {
      serviceTypeFetch().then(serviceType => {
        dispatch({
          type: INIT_SERVICE,
          data: {
            isfirst: true,
            serviceList: serviceList.result.data,
            typeList: serviceType.result.data,
          },
        })
      })
    })
  }
}

export const QUERY_SERVICE_LIST = 'QUERY_SERVICE_LIST'
export function sortServiceList(serviceType,orderBy) {
  let token = localStorage.getItem('login_token')
  return dispatch => {
    sortServiceListFetch(serviceType,orderBy).then(val => {
      dispatch({
        type: QUERY_SERVICE_LIST,
        data: {
          sortServiceList: val.result.data,
        },
      })
    })
  }
}

export const SERVICE_DETAIL = 'SERVICE_DETAIL'
export function serviceDetail(serviceId) {
  return dispatch => {
    serviceDetailFetch(serviceId).then((service) => {
      dispatch({
        type: SERVICE_DETAIL,
        data: {
          isfirst: true,
          serviceInfo: service.result.data,
          curService: serviceId,
        },
      })
    })
  }
}

export const SERVICE_REGIST = 'SERVICE_REGIST'
export function serviceRegist(serviceId, user, service, serviceList) {
  let token = localStorage.getItem('login_token')
  return dispatch => {
    return fetchData({
      url: `${config.API}/service/${serviceId}/regist`,
      token: token,
      type: 'POST',
      data: {
        name: user.nickname,
        phone: user.phone,
      },
    }).then((response) => {
      return response
    }).then((services)=> {
      dispatch({
        type: SERVICE_REGIST,
        json: {
          data: services.result,
          service: service,
          services: serviceList,
          serviceId: serviceId,
        },
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const SERVICE_ABOUT = 'SERVICE_ABOUT'
export function serviceAbout(period) {
  let token = localStorage.getItem('login_token')
  let userId = localStorage.getItem('acct_userId')
  let regionId = localStorage.getItem('region_id')
  return dispatch => {
    return fetchData({
      url: `${config.API_GET_DATA}/${regionId}/services/${period}?_userId=${userId}&populate="organizer tags cover logo region"`,
      token: token,
    }).then((response) => {
      return response
    }).then((services)=> {
      dispatch({
        type: SERVICE_ABOUT,
        json: {
          newServices: services.result.data,
          type: period,
        },
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const SERVICE_CLOSE = 'SERVICE_CLOSE'
export function serviceClose(serviceId, services, type, serviceList) {
  let token = localStorage.getItem('login_token')
  return dispatch => {
    return fetchData({
      url: `${config.API}/service/${serviceId}/regist`,
      type: 'delete',
      token: token,
    }).then((response) => {
      return response
    }).then((service)=> {
      dispatch({
        type: SERVICE_CLOSE,
        json: {
          code: service.result.code,
          serviceId: serviceId,
          services: services,
          type: type,
          serviceList: serviceList,
        },
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const SERVICE_COMMENT = 'SERVICE_COMMENT'
export const SERVICE_COMMENT_ABOUT = 'SERVICE_COMMENT_ABOUT'
export function serviceComment(serviceId, star, text, services, type) {
  let token = localStorage.getItem('login_token')
  return dispatch => {
    return fetchData({
      url: `${config.API}/service/${serviceId}/evaluate`,
      type: 'POST',
      token: token,
      data: {
        starNum: star,
        content: text,
      },
    }).then((response) => {
      return response
    }).then((service)=> {
      if(type && type === 'commentAbout') {
        dispatch({
          type: SERVICE_COMMENT_ABOUT,
          json: {
            code: service.result.code,
            serviceId: serviceId,
            services: services,
          },
        })
      }else {
        dispatch({
          type: SERVICE_COMMENT,
          json: {
            code: service.result.code,
            serviceId: serviceId,
            data: service.result.data,
            services: services,
            type: type,
          },
        })
      }
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const SERVICE_ADDCOMMENT = 'SERVICE_ADDCOMMENT'
export function serviceAddComment(serviceId, text, services, type) {
  let token = localStorage.getItem('login_token')
  let userId = localStorage.getItem('acct_userId')
  let evaluateId = ''
  let bool = false
  for(let obj of services) {
    if(bool) {
      break
    }
    for(let eva of obj.evaluates) {
      if(eva.user._id && eva.user._id === userId) {
        evaluateId = eva._id
        bool = true
        break
      }else if(eva.user && eva.user === userId) {
        evaluateId = eva._id
        bool = true
        break
      }
    }
  }
  return dispatch => {
    return fetchData({
      url: `${config.API}/service/${serviceId}/evaluate/${evaluateId}/comment`,
      type: 'POST',
      token: token,
      data: {
        content: text,
        isMerchant: false,
      },
    }).then((response) => {
      return response
    }).then((service)=> {
      dispatch({
        type: SERVICE_ADDCOMMENT,
        json: {
          code: service.result.code,
          serviceId: serviceId,
          data: service.result.data,
          services: services,
          type: type,
        },
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}

function serviceListFetch() {
  let token = localStorage.getItem('login_token')
  let regionId = localStorage.getItem('region_id')
  let requireText = ''
  requireText = `${config.API_GET_DATA}/${regionId}/services/new?populate="organizer cover tags"&sort=startTime&eq="isPublish=true"`
  return fetchData({
    url: requireText,
    token: token,
  })
}

function sortServiceListFetch(serviceType, orderBy) {
  let token = localStorage.getItem('login_token')
  let regionId = localStorage.getItem('region_id')
  let sortText = orderBy ? `&sort="${orderBy}"` : '&sort=startTime'
  let typeText = serviceType ? `&eq="serviceType=${serviceType}"` : ''
  // let typeText = ''
  // let limitText = limit ? `&eq="limit=${limit}"` : ''
  let limitText = ''
  let requireText = ''
  if (orderBy === 'full')
    requireText = `${config.API_GET_DATA}/${regionId}/services/new?populate="organizer cover tags"&ne="status=full"&eq="isPublish=true"`
  else
    requireText = `${config.API_GET_DATA}/${regionId}/services/new?eq="isPublish=true"&populate="organizer cover tags"${typeText}${sortText}`
  return fetchData({
    url: requireText,
    token: token,
  })
}

function serviceTypeFetch() {
  let token = localStorage.getItem('login_token')
  let regionId = localStorage.getItem('region_id')
  return fetchData({
    url: `${config.API_GET_DATA}/${regionId}/commonTypes?eq="type=service"`,
    token: token,
  }).then((response) => {
    return response
  }).catch((err) => {
    console.error(err)
  })
}

function serviceDetailFetch(serviceId) {
  let token = localStorage.getItem('login_token')
  return fetchData({
    url: `${config.API}/service/${serviceId}?populate="organizer tags cover logo user user"`,
    token: token,
  }).then((response) => {
    return response
  }).catch((err) => {
    console.error(err)
  })
}