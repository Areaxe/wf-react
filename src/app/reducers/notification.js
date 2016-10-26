import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'

import * as NotificationAction from '../actions/notificationaction.js'

const initialState = Immutable.fromJS({
})

export default createReducer(initialState, {
  [NotificationAction.INIT_NOTIFICATION]: (NotificationStatus, action) => {
    return NotificationStatus.merge({
      notificationInfo: action.json,
    })
  },
})