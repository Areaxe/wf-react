import config from '../config.js'
import {fetchData} from './fetchData'



//获取个人积分

export const PERSONAL_POINT = 'PERSONAL_POINT'
export function pointFetch(token) {
  let userId = localStorage.getItem('acct_userId')
  return dispatch => {
    return fetchData(
      {
        url: `${config.API}/user/${userId}/point/history?populate="mapItem user"`,
        token: token,
      }).then((response) => {
        return response
      }).then((stories) => {
        dispatch({
          type: PERSONAL_POINT,
          json: {
            data: stories.result.data,
          },
        })
      }).catch((err) => {
        console.error(err)
      })
  }
}
//用户签到
export const USER_SIGN_IN = 'USER_SIGN_IN'
export function signIn(serviceId) {
  let token = localStorage.getItem('login_token')
  return dispatch => {
    return fetchData({
      url:`${config.API}/service/${serviceId}/signin`,
      token:token,
      type:'POST',
      }).then((response) => {
        return response
      }).then((stories) => {
        dispatch({
          type: USER_SIGN_IN,
          json: {
            data: stories.result,
          },
        })
      }).catch((err) => {
        console.error(err)
      })
  }
}


export const USER_BASE_INFO = 'USER_BASE_INFO'
export function getBaseInfoFetch() {
  let token = localStorage.getItem('login_token')
  let userId = localStorage.getItem('acct_userId')
  return dispatch => {
    return fetchData({
      url: `${config.API}/user/${userId}`,
      token: token,
    }).then((response) => {
      return response
    }).then((stories) => {
      dispatch({
        type: USER_BASE_INFO,
        json: {
          data: stories.result.data,
        },
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}


export const CHANGE_USER_NAME = 'CHANGE_USER_NAME'
export function changeName(userName) {
  let token = localStorage.getItem('login_token')
  let userId = localStorage.getItem('acct_userId')
  return dispatch => {
    return fetch(
      `${config.API}/user/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "x-authorization-token": token,
        },
        body: JSON.stringify({
          nickname: userName,
        }),
        token: token,
      }).then((response) => {
        return response.json()
      }).then((stories) => {
        dispatch({
          type: CHANGE_USER_NAME,
          json: {
            data: stories.result,
          },
        })
      }).catch((err) => {
        console.error(err)
      })
  }
}

//用户修改地址
export const CHANGE_USER_ADRESS = 'CHANGE_USER_ADRESS'
export function changePosition(address) {
  let token = localStorage.getItem('login_token')
  let userId = localStorage.getItem('acct_userId')
  return dispatch => {
    return fetch(
      `${config.API}/user/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "x-authorization-token": token,
        },
        body: JSON.stringify({
          address: address,
        }),
        token: token,
      }).then((response) => {
      return response.json()
    }).then((stories) => {
      dispatch({
        type: CHANGE_USER_ADRESS,
        json: {
          data: stories.result,
        },
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}
