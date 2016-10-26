import React, { Component, PropTypes } from 'react'
import NeighborCommentList from '../../components/NeighborComment/NeighborCommentList'
import BottomButton from '../../components/Button/CustomButton'
import DocumentTitle from 'react-document-title'
import style from './NeighborCommentPage.scss'
import NoHotComment from '../../components/NoInfo/NoInfo'
import noHotCommentImg from '../../images/no-message.png'
import AddComment from '../../components/CenterContents/AddComment'
import Shade from '../../components/Shade/ScreenShade'
import Loading from '../../components/Shade/Loading'

export default class CommentListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddComment: false,
      isfirst:true,
    };
    this._handleComment = this._handleComment.bind(this)
  }

  componentWillMount() {
    if (!this.props.states.federation.whomeDetailInfo) {
      this.props.actions.whomeDetail(this.props.params._whomeId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states.federation.comment&&this.state.isfirst) {
      this.setState({
        showAddComment: false,
      })
    }
    this.setState({
      isfirst:false,
    })
  }

  _handleClick() {
    this.setState({
      showAddComment: true,
    })
  }

  _handleComment(key, text, star) {
    if (key === 'close') {
      this.setState({
        showAddComment: false,
      })
    } else if (key === 'publish') {
      this.props.actions.neighborComment(this.props.params._whomeId, text)
    }
  }

  render() {
    let hotCommentList
    if (this.props.states.federation.comments) {
      hotCommentList = this.props.states.federation.comments
    } else if (this.props.states.federation.whomeDetailInfo) {
      hotCommentList = this.props.states.federation.whomeDetailInfo[0].hotComments
    }

    let showAdd = ''
    if (this.state.showAddComment) {
      showAdd = <Shade type="bottom"><AddComment text='没话说，不街坊' parentCallback={this._handleComment.bind(this) } /></Shade>
    }
    if (hotCommentList) {
      if (hotCommentList.length) {
        return (
          <DocumentTitle title='街坊热评'>
            <div className='neighborComment-page'>
              <NeighborCommentList data={hotCommentList}/>
              <div className='bottom-button'><BottomButton onClick={this._handleClick.bind(this) } text="我也说一下"/></div>
              {showAdd}
            </div>
          </DocumentTitle>
        );
      } else {
        return (
          <DocumentTitle title='街坊热评'>
            <div className='neighborComment-page'>
              <div style={{ height: 'calc(100vh - 5rem)' }}><NoHotComment img={noHotCommentImg} text="快来当首席发言人吧！" /></div>
              <div className='bottom-button'><BottomButton onClick={this._handleClick.bind(this) } text="我也说一下"/></div>
              {showAdd}
            </div>
          </DocumentTitle>
        );
      }
    } else {
      return <DocumentTitle title='街坊热评'><Loading /></DocumentTitle>
    }


  }
}