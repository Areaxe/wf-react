import Immutable from 'immutable'
import {
  createReducer,
}
  from 'redux-immutablejs'

import * as LoginAction from '../actions/loginaction.js'

const initialState = Immutable.fromJS({
  loginIn: false,
  checkPhone: '',
  checkCode: '',
  message: '',
})

export default createReducer(initialState, {
  [LoginAction.CHECK_PHONE]: (LoginStatus, action) => {
    let messages = ''
    if(action.data.code === 2003) {
      messages = action.data.message
    }else if(action.data.code === 200) {
      messages = ''
    }
    return LoginStatus.merge({
      loginIn: false,
      checkPhone: action.data.code,
      message: messages,
    })
  },
  [LoginAction.CHECK_CODE]: (LoginStatus, action) => {
    let messages = ''
    let loginIn = false
    if(action.data.code !== 200) {
      messages = action.data.message
    }else {
      messages = ''
      loginIn = true
    }
    return LoginStatus.merge({
      loginIn: loginIn,
      checkCode: action.data.code,
      message: messages,
    })
  },
})