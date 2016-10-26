import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from '../reducers'
import diffLogger from '../utils/diffLogger.js'

const finalCreateStore = compose(
  applyMiddleware(
    thunk, 
    diffLogger({
      transformer(state) {
        return state.toJS()
      },
    }),
    createLogger({
      collapsed: true,
      stateTransformer(state) {
        return state.toJS()
      },
  })),
  
  //chrome redux devtools https://github.com/zalmoxisus/redux-devtools-extension
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState)
}