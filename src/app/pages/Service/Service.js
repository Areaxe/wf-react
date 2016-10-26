import React from 'react';
import './Service.scss';
import ServerHead from '../../components/ServerHead/ServerHead';
import DocumentTitle from 'react-document-title';
import TopMenu from '../../components/SelectCard/SelectCard';
import Loading from '../../components/Shade/Loading';
import { Affix, Menu, Icon } from 'antd';
import { Link } from 'react-router';
let regionId = window.localStorage.getItem("regionId")
const SubMenu = Menu.SubMenu;

class ServicePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      serviceType: '',
      sortKey: '',
      isfirst:true,
    }
  }

  componentWillMount() {
    if (!this.props.states.service.serviceList) {
      this.props.actions.initServiceList()
    }
  }
  // let _this = this
  //   let timer = setInterval(function () {
  //     if (_this.props.states.service.serviceList) {
  //       clearInterval(timer)
  //     } else {
  //       _this.props.actions.initServiceList()
  //     }
  //   }, 1000)
  //   setTimeout(function () {
  //     if (!_this.props.states.service.serviceList) {
  //       clearInterval(timer)
  //       alert('网速好像不给力哦，稍候再试？')
  //     }
  //   }, 15000)

  componentDidMount() {

  }
  
   componentWillReceiveProps(nextProps) {
    if (!this.props.states.service.serviceList&&this.state.isfirst) {
      this.props.actions.initServiceList()
    }
    this.setState({
      isfirst:false,
    })
  }
  _byServiceType(typeId) {
    this.setState({
      serviceType: typeId,
    })
    let sortKey = this.state.sortkey
    this.props.actions.sortServiceList(typeId, sortKey)
  }

  _sortService(key) {
    this.setState({
      sortKey: key,
    })
    let serviceType = this.state.serviceType;
    this.props.actions.sortServiceList(serviceType, key)
  }

  _serviceDetail(serviceId) {
    localStorage.setItem('curService', serviceId)
    this.props.actions.serviceDetail(serviceId)
  }

  render() {
    let states = this.props.states
    let serList
    let serviceType = []
    if (states.service.serviceType && states.service.serviceType.length) {
      serviceType = states.service.serviceType
    }
    let typeList = []

    let serDatas
    serDatas = states.service.serviceList
    if (serDatas) {
      serList = []
      for (let serData of serDatas) {
        serList.push({
          endTime: serData.endTime,
          type: 'service',
          data: serData,
        })
      }
    }
    //获取服务类型
    //获取服务类型
    for (let type of serviceType) {
      typeList.push({
        title: type.name,
        key: type._id,
      })
    }
    let leftItems = {
      title: '服务类型',
      subs: typeList,
    }

    let rightItems =
      {
        title: '智能排序',
        subs: [
          {
            title: '最新开展',
            key: 'startTime',
          },
          {
            title: '最高评分',
            key: 'star',
          },
          {
            title: '人气最高',
            key: 'registedcount',
          },
          {
            title: '忽略满额',
            key: 'full',
          },
        ],
      }
    if (serList) {
      return (
        <DocumentTitle title='来参与'>
          <div className="ser_container">
            <Affix>
              <div className='top-menu'>
                <TopMenu callbackParent={this._byServiceType.bind(this) } items={leftItems}></TopMenu>
              </div>
              <div className='top-menu'>
                <TopMenu callbackParent={this._sortService.bind(this) } items={rightItems}></TopMenu>
              </div>
            </Affix>
            {
              serList.map((val, i) => {
                if (new Date().getTime() - Number(val.endTime) <= 0)
                  return <Link key={i} to={`/service/${val.data._id}`} onClick={this._serviceDetail.bind(this, val.data._id) } ><ServerHead item={val}></ServerHead></Link>
                else
                  return <Link key={i} to={`/service/pass/${val.data._id}`} onClick={this._serviceDetail.bind(this, val.data._id) } ><ServerHead item={val}></ServerHead></Link>
              })
            }
          </div>
        </DocumentTitle>
      );
    } else {
      return <DocumentTitle title='来参与'><Loading /></DocumentTitle>
    }
  }
}


export default ServicePage;