import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore, selectLocationState } from 'react-router-redux'

import promise from 'es6-promise'
promise.polyfill()
import 'isomorphic-fetch'

import './style/antd.min.css'
import './style/main.scss'
import configureStore from './store'
import Main from './components/Main'
import Login from './pages/LoginPage/LoginPage'
import Home from './pages/Home/App'
import changeName from './pages/changeNicknamePage/changeNicknamePage'
import changePhone from './pages/ChangePhonePage/ChangePhonePage'
import AboutMePage from './pages/AboutMePage/AboutMePage'
import News from './pages/News/News'
import Service from './pages/Service/Service'
import Whome from './pages/WHome/WHome'
import PersonalInfoPage from './pages/PersonalInfoPage/PersonalInfoPage'
import SystemInfoPage from './pages/SystemInfoPage/SystemInfoPage'
import GoodsListPage from './pages/GoodsListPage/GoodsListPage'
import docCookies from './utils/cookie'
import StoreList from './pages/StoreList/StoreList'
import NewsDetail from './pages/NewsDetail/NewsDetail'
import NewServiceDetail from './pages/ServiceDetail/NewServiceDetail'
import OldServiceDetail from './pages/ServiceDetail/OldServiceDetail'
import ServiceAbout from './pages/ServiceAbout/ServiceAbout'
import CommentAbout from './pages/CommentAbout/CommentAbout'
import goodsDetail from './pages/GoodsDetailPage/GoodsDetailPage'
import whDetail from './pages/WHDetail/WHDetail'
import UserIntegralPage from './pages/UserIntegralPage/UserIntegralPage'
import changePosition from './pages/ChangePositionPage/ChangePositionPage'
import NeighborComment from './pages/NeighborCommentPage/NeighborCommentPage'
import WhomeService from './pages/WhomeService/WhomeService'
import mindBox from './pages/MindBox/MindBox'
import whomeMap from './pages/WhomeMap/WhomeMap'
import registerPage from './pages/RegisterPage/RegisterPage'
import integralRule from './pages/IntegralRule/IntegralRule'

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store, {selectLocationState: state => state.get('routing').toJS()});

const VerifyIdentity = (nextState, replace, callback) => {
  if(docCookies.hasItem('token')){                                   // 存在token即可跳转到页面，否则跳到登录页
      replace('/')
  }
  callback()
}

//onEnter={VerifyIdentity}
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} onEnter={VerifyIdentity}/>
      <Route path='/login' component={Login}/>
      <Route path='/news' component={News}/>
      <Route path="/news/:_id" component={NewsDetail}/>
      <Route path='/service' component={Service}/>
      <Route path='/user/:_id/serviceAbout' component={ServiceAbout}/>
      <Route path='/user/:_id/commentAbout' component={CommentAbout}/>
      <Route path='/women' component={Whome}/>
      <Route path='/message' component={SystemInfoPage}/>
      <Route path='/personal' component={AboutMePage}/>
      <Route path='/stores' component={StoreList}/>
      <Route path='/service/:_id' component={NewServiceDetail}/>
      <Route path='/oldServiceDetail/:_id' component={OldServiceDetail}/>
      <Route path='/service/pass/:_id' component={OldServiceDetail}/>
      <Route path='/goods/:curStoreId/:goodsId' component={goodsDetail}/>
      <Route path='/goodsList/:_storeId' component={GoodsListPage}/>
      <Route path='/whDetail/:_whomeId' component={whDetail}/>
      <Route path='/integral' component={UserIntegralPage} onEnter={VerifyIdentity}/>
      <Route path='/editUserInfo' component={PersonalInfoPage} onEnter={VerifyIdentity}/>
      <Route path='/changeName' component={changeName}/>
      <Route path='/changePhone' component={changePhone}/>
      <Route path='/changePosition' component={changePosition}/>
      <Route path='/neighborComment/:_whomeId' component={NeighborComment}/>
      <Route path='/whomeService/:_whomeId/:servicePeriod' component={WhomeService}/>
      <Route path='/mindBox' component={mindBox}/>
      <Route path='/whomeMap/:_whomeId' component={whomeMap} />
      <Route path='/signIn/:_serviceId' component={registerPage} />
      <Route path='/integralRule' component={integralRule} />
    </Route>
  </Router>
), document.getElementById('app'));
