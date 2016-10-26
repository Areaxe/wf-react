import Immutable from 'immutable'
import { createReducer}from 'redux-immutablejs'

import * as serviceAction from '../actions/serviceaction.js'
import {message} from 'antd'

const initialState = Immutable.fromJS({
  isfirst: true,
  serviceType: [],
  serviceInfo: null,
  newServices: [],
  oldServices: [],
  evaluatable: [],
  passServices: [],
  close: false,
  comm: null,
  regist: false,
})

export default createReducer(initialState, {
  [serviceAction.INIT_SERVICE]: (ServiceationStatus, action) => {
    return ServiceationStatus.merge({
      isfirst: true,
      serviceList: action.data.serviceList,
      serviceType: action.data.typeList,
    })
  },
  [serviceAction.QUERY_SERVICE_LIST]: (ServiceationStatus, action) => {
    return ServiceationStatus.merge({
      isfirst: true,
      serviceList: action.data.sortServiceList,
    })
  },
  [serviceAction.SERVICE_DETAIL]: (ServiceationStatus, action) => {
    console.info(action.data.serviceInfo)
    return ServiceationStatus.merge({
      isfirst: true,
      curService: action.data.curService,
      serviceInfo: action.data.serviceInfo,
    })
  },
  [serviceAction.SERVICE_ABOUT]: (ServiceationStatus, action) => {
    if(action.json.type === 'new') {
      return ServiceationStatus.merge({
        isfirst: false,
        newServices: action.json.newServices,
      })
    }else if(action.json.type === 'pass') {
      return ServiceationStatus.merge({
        isfirst: false,
        oldServices: action.json.newServices,
      })
    }else if(action.json.type === 'evaluatable') {
      return ServiceationStatus.merge({
        isfirst: false,
        evaluatable: action.json.newServices,
      })
    }else if(action.json.type === 'evaluated') {
      return ServiceationStatus.merge({
        isfirst: false,
        passServices: action.json.newServices,
      })
    }
  },
  [serviceAction.SERVICE_CLOSE]: (ServiceationStatus, action) => {
    let infos = []
    let serviceList = []
    console.info("++++++code:"+action.json.code)
    if (action.json.code === 200) {
      if(action.json.serviceList) {
        for (let obj of action.json.serviceList) {
          if(obj._id === action.json.serviceId) {
            let ser = action.json.services[0]
            ser.userStatus.registState = 'unregist'
            serviceList.push(ser)
          }else {
            serviceList.push(obj)
          }
        }
      }
      if(action.json.type && action.json.type === 'detail') {
        infos = action.json.services
        infos[0].userStatus.registState = 'unregist'
        message.info('取消预约成功！')
        if(serviceList.length===0) {
          return ServiceationStatus.merge({
            serviceInfo: infos,
          })
        }else {
          return ServiceationStatus.merge({
            serviceInfo: infos,
            serviceList: serviceList,
          })
        }
      }else {
        console.info(action.json.services)
        for(let obj of action.json.services) {
          if(obj._id !== action.json.serviceId) {
            infos.push(obj)
          }
        }
        message.info('取消预约成功！')
        if(serviceList.length===0) {
          return ServiceationStatus.merge({
            newServices: infos,
          })
        }else {
          return ServiceationStatus.merge({
            newServices: infos,
            serviceList: serviceList,
          })
        }
      }
    }else {
      message.error('预约取消失败，请重试！')
    }
  },
  [serviceAction.SERVICE_COMMENT]: (ServiceationStatus, action) => {
    let info = []
    let bool = false
    if(action.json.code === 200) {
      bool = true
      message.success('点评成功！')
      for(let it of action.json.services) {
        if(it._id === action.json.serviceId) {
          let obj = action.json.data
          let userStatus = {evaluateState:'addable',registState:'registed'}
          obj.userStatus = userStatus
          obj.cover = it.cover
          info.push(obj)
        }else {
          info.push(it)
        }
      }
    }else {
      message.error('网络繁忙，请稍后再试！')
      info = action.json.services
    }
    if(action.json.type && action.json.type === 'detail') {
      return ServiceationStatus.merge({
        serviceInfo: info,
        close: bool,
      })
    }else {
      return ServiceationStatus.merge({
        oldServices: info,
        close: bool,
      })
    }
  },
  [serviceAction.SERVICE_ADDCOMMENT]: (ServiceationStatus, action) => {
    let info = []
    let bool = false
    if(action.json.code === 200) {
      bool = true
      message.success('追加点评成功')
      for(let it of action.json.services) {
        if(it._id === action.json.serviceId) {
          let obj = action.json.data;
          let userStatus = {evaluateState:'unevaluatable',registState:'registed'}
          obj.userStatus = userStatus
          obj.cover = it.cover
          info.push(obj)
        }else {
          info.push(it)
        }
      }
    }else {
      message.error('网络繁忙，请稍微再试！')
      info = action.json.services
    }
    if(action.json.type === 'commentAbout') {
      return ServiceationStatus.merge({
        passServices: info,
        close: bool,
      })
    }else if(action.json.type === 'detail') {
      return ServiceationStatus.merge({
        serviceInfo: info,
        close: bool,
      })
    }else {
      return ServiceationStatus.merge({
        oldServices: info,
        close: bool,
      })
    }
  },
  [serviceAction.SERVICE_COMMENT_ABOUT]: (ServiceationStatus, action) => {
    let infos = []
    let bool = false
    if (action.json.code === 200) {
      bool = true
      message.success('点评成功')
      for(let obj of action.json.services) {
        if(obj._id !== action.json.serviceId) {
          infos.push(obj)
        }
      }
    }else {
      message.error('网络繁忙，请稍后再试！')
      infos = action.json.services
    }
    return ServiceationStatus.merge({
      evaluatable: infos,
      close: true,
    })
  },
  [serviceAction.SERVICE_REGIST]: (ServiceationStatus, action) => {
    let infos = false
    let service = []
    let services = []
    if (action.json.data.code === 200) {
      infos = true
      service.push(action.json.data.data)
      let userStatus = {evaluateState:'evaluatable',registState:'registed'}
      service[0].userStatus = userStatus
      service[0].cover = action.json.service[0].cover
      service[0].organizer = action.json.service[0].organizer
      service[0].tags = action.json.service[0].tags
      if(action.json.services) {
        for (let obj of action.json.services) {
          if(obj._id === action.json.serviceId) {
            services.push(service[0])
          }else {
            services.push(obj)
          }
        }
      }
      message.info('预约成功！')
      if(services.length === 0) {
        return ServiceationStatus.merge({
          regist: infos,
          serviceInfo: service,
        })
      }else {
        return ServiceationStatus.merge({
          regist: infos,
          serviceInfo: service,
          serviceList: services,
        })
      }
    }else {
      message.error('预约失败，请重试！')
    }
  },
})