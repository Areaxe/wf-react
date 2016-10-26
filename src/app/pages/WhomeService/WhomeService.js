import React from 'react'
import DocumentTitle from 'react-document-title'
import {Link} from 'react-router'
import ServerHead from '../../components/ServerHead/ServerHead'
import style from './WhomeService.scss'
import Loading from '../../components/Shade/Loading'

class WHomeServiceList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  componentWillMount() {
    if (!this.props.states.federation.newService && !this.props.states.federation.oldService) {
      this.props.actions.whServiceList(this.props.params._whomeId, this.props.params.servicePeriod)
    }
  }

  render() {

    let serviceList = []
    let serviceDatas
    switch (this.props.params.servicePeriod) {
      case 'new':
        if (this.props.states.federation.newService) {
          serviceDatas = this.props.states.federation.newService
        } else if (this.props.states.federation.whomeServiceList) {
          serviceDatas = this.props.states.federation.whomeServiceList
        }
        break

      case 'pass':
        if (this.props.states.federation.oldService) {
          serviceDatas = this.props.states.federation.oldService
        }
        else if (this.props.states.federation.whomeServiceList) {
          serviceDatas = this.props.states.federation.whomeServiceList
        }
        break
    }

    let serviceHtml = ''
    if (serviceDatas) {
      serviceDatas.map((serData, i) => {
        serviceList.push({
          startTime: serData.startTime,
          data: serData,
        })
      })
      if (serviceList.length) {
        switch (this.props.params.servicePeriod) {
          case 'new':
            serviceHtml = serviceList.map((val, i) => {
              return <Link key={i} to={`service/${val.data._id}`} ><ServerHead item={{ data: val.data, type: 'service' }}></ServerHead></Link>
            })
            break
          case 'pass':
            serviceHtml = serviceList.map((val, i) => {
              return <Link key={i} to={`/oldServiceDetail/${val.data._id}`} ><ServerHead item={{ data: val.data, type: 'old' }}></ServerHead></Link>
            })
            break
        }
      } else {
        serviceHtml = <div className="no-service">暂无服务</div>
      }
      return (
        <DocumentTitle title='妇女之家'>
          <div className='whome-service'>
            {
              serviceHtml
            }
          </div>
        </DocumentTitle>
      )

    }
    else {
      return (
        <DocumentTitle title='妇女之家'>
          <Loading />
        </DocumentTitle>
      )
    }

  }
}

export default WHomeServiceList;

