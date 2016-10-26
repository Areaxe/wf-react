import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'

import * as SysConfigAction from '../actions/sysConfig.js'

const initialState = Immutable.fromJS({
  integralRule: [],
})

export default createReducer(initialState, {
  [SysConfigAction.SYSTEM_CONFIG]: (configStatus, action) => {
    return configStatus.merge({
      integralRule: action.json,
    })
  },
})