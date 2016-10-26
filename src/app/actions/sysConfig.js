// GET /region/:_id/sysconfig
import config from '../config.js'
import {fetchData} from './fetchData.js'
//积分规则内容获取
export const SYSTEM_CONFIG = 'SYSTEM_CONFIG'
export function getSystemConfig() {
    let regionId = localStorage.getItem('region_id')
  return dispatch => {
    return fetchData(
      {
        url:`${config.API_GET_DATA}/${regionId}/sysconfig`,
      }).then((response)=> {
      return response
    }).then((systemConfig)=> {
      dispatch({
        type: SYSTEM_CONFIG,
        json: systemConfig.result.data,
      })
    })
  }
}