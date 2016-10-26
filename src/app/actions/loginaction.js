import config from '../config.js'
import {fetchData} from './fetchData'

export const CHECK_PHONE = 'CHECK_PHONE'
export function checkPhone(phoneNum) {                                  //验证手机号码
  return dispatch => {
    return fetchData({
      url: `${config.API_ACCOUNT_CERTIFICATE}/${phoneNum}`,
    }).then((response) => {
      return response
    }).then((stories) => {
      dispatch({
        type: CHECK_PHONE,
        data: stories.result,
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}


export const CHECK_CODE = 'CHECK_CODE'
export function checkCode(token, phoneNum, code) {                                  //提交验证码并登录
  return dispatch => {
    return fetchData({
      url: `${config.API_ACCOUNT_CERTIFICATE}/phone`,
      type: "POST",
      data: {
        phone: phoneNum,
        code: code,
      },
      token: token,
    }).then((response) => {
      return response
    }).then((stories) => {
      dispatch({
        type: CHECK_CODE,
        data: stories.result,
      })
    }).catch((err) => {
      console.error(err)
    })
  }
}
