import config from '../config.js'
import {fetchData} from './fetchData'

export const INIT_NOTIFICATION = 'INIT_NOTIFICATION'
export function initNotification() {                                  //对应妇女之家
  let userId = localStorage.getItem('acct_userId')
  let token = localStorage.getItem('login_token')
  return dispatch => {
    return fetchData(
      {
        url:`${config.API_USER}/${userId}/notifications?sort=-date`,
        token: token,
      }).then((response)=> {
      return response
    }).then((notifications)=> {
      dispatch({
        type: INIT_NOTIFICATION,
        json: notifications.result.data,
      })
    })
  }
}