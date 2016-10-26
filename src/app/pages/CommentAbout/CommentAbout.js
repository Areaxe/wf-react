import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import './CommentAbout.scss'
import ServiceList from '../../components/ServiceList/ServiceList'
import Shade from '../../components/Shade/ScreenShade'
import CommentArea from '../../components/CenterContents/CommentArea'
import AddComment from '../../components/CenterContents/AddComment'
import NoInfo from '../../components/NoInfo/NoInfo'
import noEvaluatableImg from '../../images/no-comment.png'
import noEvaluatedImg from '../../images/no-history.png'
import Loading from '../../components/Shade/Loading'

export default class ServiceAbout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      period: 'evaluatable',
      isFirst: true,
      showComment: false,
      showAddComment: false,
      currId: '',
      serviceList: [],
    };
    this._waitComment = this._waitComment.bind(this)
    this._commentPass = this._commentPass.bind(this)
    this._handleButtonClick = this._handleButtonClick.bind(this)
    this._handleComment = this._handleComment.bind(this)
  }

  _waitComment() {
    this.props.actions.serviceAbout('evaluatable')
    this.setState({
      period: 'evaluatable',
    })
  }

  _commentPass() {
    this.props.actions.serviceAbout('evaluated')
    this.setState({
      period: 'evaluated',
    })
  }

  _handleButtonClick(serviceId, html, signInState) {
    if (html.indexOf('追加点评') >= 0) {
      this.setState({
        showAddComment: true,
        currId: serviceId,
      })
    } else if (html.indexOf('点 评') >= 0 || html.indexOf('点评') >= 0) {
      switch (signInState) {
        case 'unsignin':
          alert(' 无法正常点评，是不是忘了签到啦？')
          break;
        case 'signined':
          this.setState({
            showComment: true,
            currId: serviceId,
          })
      }
    }
  }

  _handleComment(key, text, star) {
    if (key === 'later') {
      this.setState({
        showComment: false,
      })
    } else if (key === 'complete') {
      this.props.actions.serviceComment(this.state.currId, star, text, this.props.states.service.evaluatable, 'commentAbout')
    } else if (key === 'close') {
      this.setState({
        showAddComment: false,
      })
    } else if (key === 'publish') {
      this.props.actions.serviceAddComment(this.state.currId, text, this.props.states.service.passServices, 'commentAbout')
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
    if (project && project.region && project.token.length > 1 && project.userId.length > 1 && this.state.serviceList.length === 0 && this.state.isFirst) {
      this.setState({
        isFirst: false,
      })
      nextProps.actions.serviceAbout('evaluatable')
    }
  }

  componentWillMount() {
    this.props.actions.serviceAbout('evaluatable')
  }

  componentDidMount() {
    this.props.actions.serviceAbout('evaluatable')
  }

  render() {

    let info = this.state.period === 'evaluatable' ? this.props.states.service.evaluatable : this.props.states.service.passServices
    console.log(this.state.period)
    let newActive = this.state.period === 'evaluatable' ? 'on' : ''
    let passActive = this.state.period === 'evaluated' ? 'on' : ''
    let list = ''
    if (info) {
      console.log(info.length)
      if (info.length) {
        list = <ServiceList parentCallback={this._handleButtonClick.bind(this) } InfoDatas={{ info: info, type: 'old' }} />
      } else {
        switch (this.state.period) {
          case 'evaluatable':
            list = <div style={{ height: 'calc(100vh - 21rem)' }}><NoInfo img={noEvaluatableImg} text="你完成得很好，请继续保持！" /></div>
            break
          case 'evaluated':
            list = <div style={{ height: 'calc(100vh - 21rem)' }}><NoInfo img={noEvaluatedImg} text="你暂时没留下过点评哦~" /></div>
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
    if (list) {
      return (
        <DocumentTitle title='点评相关'>
          <div>
            <div className='wHome-title'>
              <ul>
                <li className={newActive} onClick={this._waitComment.bind(this) }><span>待点评</span></li>
                <li className={passActive} onClick={this._commentPass.bind(this) }><span>点评历史</span></li>
              </ul>
            </div>
            {list}
            {show}
            {showAdd}
          </div>
        </DocumentTitle>
      );
    } else {
      return <DocumentTitle title='服务相关'><Loading /></DocumentTitle>
    }

  }
}