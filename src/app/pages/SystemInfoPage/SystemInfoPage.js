import React, { Component, PropTypes } from 'react'
import InfoList from '../../components/SystemInfoList/SystemInfoList'
import Menu from '../../components/Menu/Menu'
import NoMessage from '../../components/NoInfo/NoInfo'
import noMessageImg from '../../images/no-message.png'
import DocumentTitle from 'react-document-title'
import Loading from '../../components/Shade/Loading'

export default class CommentListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFirst: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    let project = nextProps.states.project
    if (project.userId.length > 1 && project.token.length > 1 && this.state.isFirst) {
      this.setState({
        isFirst: false,
      })
      this.props.actions.initNotification()
    }
  }

  componentWillMount() {
    //if(this.props.states.project.userId.length>1 && this.props.states.project.token.length>1) {
    //	this.props.actions.initNotification(this.props.states.project.userId, this.props.states.project.token)
    //}
    this.props.actions.initNotification()
  }

  componentDidMount() {
    this.props.actions.initNotification()
  }

  render() {
    let info = this.props.states.notification.notificationInfo
    let userId = this.props.states.project.userId ? this.props.states.project.userId : ''
    if (info) {
      if (info.length) {
        return (
          <DocumentTitle title='消息'>
            <div>
              <InfoList InfoDatas={{ items: info, userId: userId }}/>
              <Menu index="2" />
            </div>
          </DocumentTitle>
        );
      } else {
        return (
          <DocumentTitle title='消息'>
            <div style={{ height: 'calc(100vh - 10rem)' }}>
              <NoMessage img={noMessageImg} text="看来你很低调，动一下吧!" />
              <Menu index="2" />
            </div>
          </DocumentTitle>
        );
      }
    } else {
      return (
        <DocumentTitle title='消息'>
          <Loading />
        </DocumentTitle>
      )
    }
  }
}