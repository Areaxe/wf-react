import Immutable from 'immutable'
import {
  createReducer,
}
  from 'redux-immutablejs'

import * as FederationAction from '../actions/federation.js'

const initialState = Immutable.fromJS({
  isfirst: true,
  womenHomeInfo: [],
  distanceInfo: [],
  starInfo: [],
  comment: false,
})

export default createReducer(initialState, {
  [FederationAction.INIT_FEDERATION]: (FederationStatus, action) => {
    return FederationStatus.merge({
      isfirst: false,
      womenHomeInfo: action.json,
    })
  },
  [FederationAction.DISTANCE_FEDERATION]: (FederationStatus, action) => {
    if (action.json === false) {
      return FederationStatus.merge({
        isfirst: false,
      })
    } else {
      return FederationStatus.merge({
        isfirst: false,
        distanceInfo: action.json,
      })
    }
  },
  [FederationAction.STAR_FEDERATION]: (FederationStatus, action) => {
    if (action.json === false) {
      return FederationStatus.merge({
        isfirst: false,
      })
    } else {
      return FederationStatus.merge({
        isfirst: false,
        starInfo: action.json,
      })
    }
  },
  [FederationAction.FEDERATION_DETAIL]: (FederationStatus, action) => {
    return FederationStatus.merge({
      whomeDetailInfo: action.data.whomeInfo,
      oldService: action.data.oldService,
      newService: action.data.newService,
    })
  },
  [FederationAction.FEDERATION_HOT_COMMENT]: (FederationStatus, action) => {
    let bool = false
    if (action.json.data.code === 200) {
      bool = true
    }
    return FederationStatus.merge({
      comment: true,
      comments: action.json.data.hotComments,
    })
  },
  [FederationAction.FEDERATION_SERVICE_LIST]: (FederationStatus, action) => {
    return FederationStatus.merge({
      whomeServiceList: action.data.whomeServiceList,
    })
  },
})