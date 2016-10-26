import Immutable from 'immutable'
import {
  createReducer,
}
from 'redux-immutablejs'

import * as ProjectAction from '../actions/project.js'

const initialState = Immutable.fromJS({
  isfirst: true,
  region: {},
  banner: [],
  module: {},
  service: {},
  news: [],
  newsTypes: [],
  token: '',
  userId: '',
  wxUser: {},
})

export default createReducer(initialState, {
  [ProjectAction.INIT_FETCH]: (projectStatus, action) => {
    return projectStatus.merge({
      region: action.json.region,
      banner: action.json.banner,
      service: action.json.service,
      module: action.json.module,
      token: action.json.token,
      userId: action.json.userId,
      wxUser: action.json.wxUser,
    })
  },

  [ProjectAction.UPDATE_PROJECT_DATA]: (projectStatus, action) => {
    return projectStatus.merge({
      isfirst  : action.json.isfirst,
      news     : action.json.news,
      newsTypes: action.json.newsTypes,
    })
  },
})