import config from '../config.js'
import {fetchData} from './fetchData'

export const INIT_FEDERATION = 'INIT_FEDERATION'
export function initFederation() {
  let regionId = localStorage.getItem('region_id')                                  //对应妇女之家
  return dispatch => {
    return fetch(`${config.API_GET_DATA}/${regionId}/organizers?eq="type=hr"&populate="logo"`).then((response) => {
      return response.json()
    }).then((stories) => {
      dispatch({
        type: INIT_FEDERATION,
        json: stories.result.data,
      })
    })
  }
}

export const DISTANCE_FEDERATION = 'DISTANCE_FEDERATION'
export function orderByDistance(first, lng, lat) {
  let regionId = localStorage.getItem('region_id') 
  return dispatch => {
    if (first) {
      return fetchData({
        url:`${config.API_GET_DATA}/${regionId}/organizers?eq="type=hr"&populate="logo"&lat=${lat}&lng=${lng}`,
      }).then((response) => {
        return response
      }).then((stories) => {
        dispatch({
          type: DISTANCE_FEDERATION,
          json: stories.result.data,
        })
      }).catch((err) => {
        console.error(err)
      })
    } else {
      dispatch({
        type: DISTANCE_FEDERATION,
        json: first,
      })
    }
  }
}

export const STAR_FEDERATION = 'STAR_FEDERATION'
export function orderByStar(first) {
  let regionId = localStorage.getItem('region_id') 
  return dispatch => {
    if (first) {
      return fetchData({
        url:`${config.API_GET_DATA}/${regionId}/organizers?eq="type=hr"&populate="logo"&sort="-star"`,
      }).then((response) => {
        return response
      }).then((stories) => {
        dispatch({
          type: STAR_FEDERATION,
          json: stories.result.data,
        })
      }).catch((err) => {
        console.error(err)
      })
    } else {
      dispatch({
        type: STAR_FEDERATION,
        json: first,
      })
    }
  }
}

export const FEDERATION_DETAIL = 'FEDERATION_DETAIL'
export function whomeDetail(organizerId) {
  return dispatch => {
    return fetchWhomeInfo(organizerId).then((whomeInfo) => {
      fetchServiceByTime(organizerId, 'new').then((newService) => {
        fetchServiceByTime(organizerId, 'pass').then((oldService) => {
          dispatch({
            type: FEDERATION_DETAIL,
            data: {
              whomeInfo: whomeInfo.result.data,
              oldService: oldService.result.data,
              newService: newService.result.data,
            },
          })
        })
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}

export const FEDERATION_SERVICE_LIST = 'FEDERATION_SERVICE_LIST'
export function whServiceList(organizerId, period) {
  return dispatch => {
    return fetchServiceByTime(organizerId, period).then((whomeServiceList) => {
      dispatch({
        type: FEDERATION_SERVICE_LIST,
        data: {
          whomeServiceList: whomeServiceList.result.data,
        },
      })
    })
  }
}

export const FEDERATION_HOT_COMMENT = 'FEDERATION_HOT_COMMENT'
export function neighborComment(organizerId, text) {
  return dispatch => {
    return postNeighborComment(organizerId, text).then((comment) => {
      dispatch({
        type: FEDERATION_HOT_COMMENT,
        json: {
          data: comment.result.data,
        },
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}


function fetchServiceByTime(organizerId, query, limit) {
  let token = localStorage.getItem('login_token')
  let regionId = localStorage.getItem('region_id')
  let limitText = limit ? `&limit=${limit}` : ''
  return fetchData({
    url: `${config.API_GET_DATA}/${regionId}/services/${query}?eq="organizer=${organizerId}"&populate="cover tags"${limitText}`,
    token: token,
  }).then((response) => {
    return response
  }).catch((err) => {
    console.error(err)
  })
}

function fetchWhomeInfo(organizerId) {
  let token = localStorage.getItem('login_token')
  return fetchData({
    url: `${config.API}/organizer/${organizerId}?eq="type=hr"&populate="logo pictures"`,
    token: token,
  })
    .then((response) => {
      return response
    }).catch((err) => {
      console.error(err)
    })
}

function postNeighborComment(organizerId, text) {
  let token = localStorage.getItem('login_token')
  return fetchData({
    url: `${config.API}/organizer/${organizerId}/hotcomment?eq="type=hr"`,
    token: token,
    type: 'POST',
    data: {
      content: text,
    },
  }).then((response) => {
    return response
  }).catch(err => {
    console.error(err)
  })
}
