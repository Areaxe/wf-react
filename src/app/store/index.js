import createStoreDev from './store.dev'
import createStoreProd from './store.prod'

let createStore

if (process.env.NODE_ENV === 'production') {
  createStore = createStoreProd
} else {
  createStore = createStoreDev
}

export default createStore