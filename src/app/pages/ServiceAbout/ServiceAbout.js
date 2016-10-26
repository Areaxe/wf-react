import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import './ServiceAbout.scss'
import ServiceList from '../../components/ServiceList/ServiceList'
import Shade from '../../components/Shade/ScreenShade'
import CommentArea from '../../components/CenterContents/CommentArea'
import AddComment from '../../components/CenterContents/AddComment'
import IfReservation from '../../components/CenterContents/PromptDialog'
import promtTopImg from '../../images/service.png'
import NoInfo from '../../components/NoInfo/NoInfo'
import newServiceImg from '../../images/no-newService.png'
import oldServiceImg from '../../images/no-history.png'
import Loading from '../../components/Shade/Loading'

export default class ServiceAbout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      period: 'new',
      isFirst: true,
      showComment: false,
      showAddComment: false,
      showReservation: false,
      currId: '',
    };
    this._orderByNew = this._orderByNew.bind(this)
    this._orderByPass = this._orderByPass.bind(this)
    this._handleButtonClick = this._handleButtonClick.bind(this)
    this._handleComment = this._handleComment.bind(this)
  }

  _orderByNew() {
    this.props.actions.serviceAbout('new')
    this.setState({
      period: 'new',
    })
  }

  _orderByPass() {
    this.props.actions.serviceAbout('pass')
    this.setState({
      period: 'pass',
    })
  }

  _cancleReservation() {
    this.setState({
      showReservation: false,
    })
    return false
  }

  _reservationSure() {
    let states = this.props.states
    this.props.actions.serviceClose(this.state.currId, states.service.newServices, 'serviceAbout', states.service.serviceList)
    this.setState({
      showReservation: false,
    })
  }

  _handleButtonClick(serviceId, html, signInState) {
    if (html.indexOf('取消预约') >= 0) {
      this.setState({
        showReservation: true,
        currId: serviceId,
      })
    } else if (html.indexOf('点 评') >= 0) {
      switch (signInState) {
        case 'unsignin':
          alert(' 无法正常点评，是不是忘了签到啦？')
          break;
        case 'signined':
          this.setState({
            showComment: true,
            currId: serviceId,
          })
          break
      }
      let userId = localStorage.getItem('acct_userId')
      // let registions = this.props.states.oldServices
      // if(userId.match())

    } else if (html.indexOf('追加点评') >= 0) {
      this.setState({
        showAddComment: true,
        currId: serviceId,
      })
    }
  }

  _handleComment(key, text, star) {
    if (key === 'later') {
      this.setState({
        showComment: false,
      })
    } else if (key === 'complete') {
      this.props.actions.serviceComment(this.state.currId, star, text, this.props.states.service.oldServices)
    } else if (key === 'close') {
      this.setState({
        showAddComment: false,
      })
    } else if (key === 'publish') {
      this.props.actions.serviceAddComment(this.state.currId, text, this.props.states.service.oldServices)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states.service.close) {
      this.setState({
        showComment: false,
        showAddComment: false,
      })
    }
    let project = nextProps.states.project
    if (project && project.region && project.token.length > 1 && project.userId.length > 1 && this.props.states.service.newServices === undefined && this.state.isFirst) {
      nextProps.actions.serviceAbout(this.state.period)
    }
  }

  componentWillMount() {
    this.props.actions.serviceAbout('new')
  }

  componentDidMount() {
    this.props.actions.serviceAbout('new')
  }

  render() {

    let info = this.state.period === 'new' ? this.props.states.service.newServices : this.props.states.service.oldServices
    let newActive = this.state.period === 'new' ? 'on' : ''
    let passActive = this.state.period === 'pass' ? 'on' : ''
    let list = ''
    if (info) {
      if (info.length) {
        list = <ServiceList parentCallback={this._handleButtonClick.bind(this) } InfoDatas={{ info: info, type: this.state.period === 'new' ? 'newService' : 'old' }} />
      } else {
        switch (this.state.period) {
          case 'new':
            list = <div style={{ height: 'calc(100vh - 21rem)' }}><NoInfo img={newServiceImg} text="暂无预约最新服务，出去逛逛如何？" /></div>
            break
          case 'pass':
            list = <div style={{ height: 'calc(100vh - 21rem)' }}><NoInfo img={oldServiceImg} text="我们很想为你服务，来吧！" /></div>
            break
        }
      }

    }
    let show = ''
    if (this.state.showComment) {
      show = <Shade type="center"><CommentArea parentCallback={this._handleComment.bind(this) } /></Shade>
    }
    let showAdd = ''
    if (this.state.showAddComment) {
      showAdd = <Shade type="bottom"><AddComment text='追加评价' parentCallback={this._handleComment.bind(this) } /></Shade>
    }
    let promtInfo = {
      topImg: promtTopImg,
      btn1Click: this._cancleReservation.bind(this),
      btn2Click: this._reservationSure.bind(this),
      btnText1: '取消',
      btnText2: '确定',
      mainText: '取消后将不能再预约此服务',
    }
    let shadeInfo = ''
    if (this.state.showReservation) {
      shadeInfo = <Shade type='center'><IfReservation data={promtInfo}></IfReservation></Shade>
    }
    if (list) {
      return (
        <DocumentTitle title='服务相关'>
          <div>
            <div className='wHome-title'>
              <ul>
                <li className={newActive} onClick={this._orderByNew.bind(this) }><span>新服务</span></li>
                <li className={passActive} onClick={this._orderByPass.bind(this) }><span>服务历史</span></li>
              </ul>
            </div>
            {list}
            {show}
            {showAdd}
            {shadeInfo}
          </div>
        </DocumentTitle>
      );
    } else {
      return <DocumentTitle title='服务相关'><Loading /> </DocumentTitle>
    }

  }
}