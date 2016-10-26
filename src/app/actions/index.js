import * as projectActions           from './project.js'
import * as federationActions        from './federation.js'
import * as profileActions           from './profile.js'
import * as storeActions             from './storeaction.js'
import * as loginActions             from './loginaction.js'
import * as newsActions              from './newsaction.js'
import * as notificationActions      from './notificationaction.js'
import * as serviceActions           from './serviceaction.js'
import * as personal                 from './personal.js'
import * as systemConfig             from './sysConfig.js'

export default Object.assign({},
  projectActions,
  federationActions,
  profileActions,
  storeActions,
  loginActions,
  newsActions,
  notificationActions,
  serviceActions,
  personal,
  systemConfig,
)