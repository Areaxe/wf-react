import Immutable from 'immutable'
import {
  createReducer,
}
  from 'redux-immutablejs'

import * as PersonalAction from '../actions/personal.js'

const initialState = Immutable.fromJS({
  point: [],
})

let id = []

export default createReducer(initialState, {
  [PersonalAction.PERSONAL_POINT]: (PersonStatus, action) => {
    return PersonStatus.merge({
      point : action.json.data,
    })
  },
  [PersonalAction.USER_BASE_INFO]: (PersonStatus, action) => {
    return PersonStatus.merge({
      userBaseInfo : action.json.data,
    })
  },
  [PersonalAction.CHANGE_USER_NAME]: (PersonStatus, action) => {
    return PersonStatus.merge({
      changenameInfo : action.json.data,
    })
  },
  [PersonalAction.CHANGE_USER_ADRESS]: (PersonStatus, action) => {
    return PersonStatus.merge({
      changeAddressInfo : action.json.data,
    })
  },
  [PersonalAction.USER_SIGN_IN]: (PersonStatus, action) => {
    return PersonStatus.merge({
      signService: action.json.data,
    })
  },
})
