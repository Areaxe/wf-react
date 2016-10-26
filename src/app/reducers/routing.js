import Immutable from 'immutable'
import { routerReducer, LOCATION_CHANGE } from 'react-router-redux'

const initState = Immutable.fromJS({
  locationBeforeTransitions: null,
})

export default function reducers(state = initState, action) {
  switch(action.type) {
    case LOCATION_CHANGE:
      //return state.set('routing', routerReducer(state.get('routing'), action))
      return state.merge({
            locationBeforeTransitions: action.payload,
      });
    default:
      return state
  }
}