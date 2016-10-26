import { combineReducers } from 'redux-immutablejs'

import project      from './project.js'
import federation   from './federation.js'
import message      from './message.js'
import profile      from './profile.js'
import routing      from './routing.js'
import stores       from './stores.js'
import login        from './login.js'
import news         from './news.js'
import notification from './notification.js'
import service      from './service.js'
import personal    from './personal.js'
import systemConfig    from './systemconfig.js'

export default combineReducers({
  project,
  federation,
  message,
  profile,
  routing,
  stores,
  login,
  news,
  notification,
  service,
  personal,
  systemConfig,
})