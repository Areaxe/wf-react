import React from 'react'
import ServiceHead from '../../components/ServerHead/ServerHead'
import DocumentTitle from 'react-document-title'
import style from './OldServiceDetail.scss'
import DetailHead from '../../components/DetailHead/DetailHead'
import fwIcon from '../../images/zuixinfuwu.png'
import BottomButton from '../../components/Button/CustomButton'
import promtTopImg from '../../images/service.png'
import { Tabs } from 'antd';
import CommentItem from '../../components/CommentItem/CommentItem'
import CommentList from '../../components/CommentList/CommentList'
import Shade from '../../components/Shade/ScreenShade'
import CommentArea from '../../components/CenterContents/CommentArea'
import AddComment from '../../components/CenterContents/AddComment'
import NoComment from '../../components/NoInfo/NoInfo'
import Loading from '../../components/Shade/Loading'
import noCommentImg from '../../images/no-message.png'


class OldServiceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComment: false,
      showAddComment: false,
      isfirst: true,
    }
  }

  componentWillMount() {
    let serviceId = this.props.params._id
    this.props.actions.serviceDetail(serviceId)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states.service.close) {
      this.setState({
        showComment: false,
        showAddComment: false,
      })
    }
    if (!this.props.states.service.serviceInfo && this.state.isfirst) {
      let serviceId = this.props.params._id
      this.props.actions.serviceDetail(serviceId)
    }
    this.setState({
      isfirst: false,
    })
  }

  _handleButtonClick(e) {
    if (e.target.innerHTML.indexOf('追加点评') >= 0) {
      this.setState({
        showAddComment: true,
        currId: this.props.params._id,
      })
    } else if (e.target.innerHTML.indexOf('点 评') >= 0 || e.target.innerHTML.indexOf('点评') >= 0) {
      this.setState({
        showComment: true,
        currId: this.props.params._id,
      })
    }
  }
  _cantnotComment() {
    alert('无法正常点评，是不是忘了签到啦？')
  }

  _handleComment(key, text, star) {
    if (key === 'later') {
      this.setState({
        showComment: false,
      })
    } else if (key === 'complete') {
      this.props.actions.serviceComment(this.state.currId, star, text, this.props.states.service.serviceInfo, 'detail')
    } else if (key === 'close') {
      this.setState({
        showAddComment: false,
      })
    } else if (key === 'publish') {
      this.props.actions.serviceAddComment(this.state.currId, text, this.props.states.service.serviceInfo, 'detail')
    }
  }

  render() {
    const TabPane = Tabs.TabPane;
    {
      let serData, item
      if (this.props.states.service.serviceInfo) {
        serData = this.props.states.service.serviceInfo[0]
      }

      if (serData) {
        item = {
          type: 'oldDetail',
          data: serData,
        }
        let serDetailHead = {
          tip: '活动详情',
          imgLink: fwIcon,
        }
        let bottomButton = ''
        //判断用户点评状态
        if (item.data.userStatus && item.data.userStatus.registState === 'registed') {
          switch (item.data.userStatus.evaluateState) {
            case 'evaluatable':
              switch (item.data.userStatus.signinState) {
                case 'unsignin':
                  bottomButton = <div className='bottom disabled'><BottomButton onClick={this._cantnotComment.bind(this)}>点评</BottomButton></div>
                  break
                case 'signined':
                  bottomButton = <div className='bottom'><BottomButton onClick={this._handleButtonClick.bind(this)}>点评</BottomButton></div>
                  break
                default:
                  bottomButton = <div className='bottom disabled'><BottomButton onClick={this._cantnotComment.bind(this)}>点评</BottomButton></div>
                  break
              }
              break
            case 'addable':
              bottomButton = <div className='bottom'><BottomButton onClick={this._handleButtonClick.bind(this)}>追加点评</BottomButton></div>
              break
            default:
              bottomButton = ''
          }
        }

        let commentList = serData.evaluates
        let commentText = ''
        if (commentList.length) {
          commentText = commentList.map((comment, i) => {
            return <div key={i}><CommentItem data={comment}></CommentItem></div>
          })
        } else {
          commentText = <div style={{ height: '60vh' }}><NoComment img={noCommentImg} text="点评还在路上~" /></div>
        }

        let show = ''
        if (this.state.showComment) {
          show = <Shade type="center"><CommentArea parentCallback={this._handleComment.bind(this)} /></Shade>
        }
        let showAdd = ''
        if (this.state.showAddComment) {
          showAdd = <Shade type="bottom"><AddComment text='追加评价' parentCallback={this._handleComment.bind(this)} /></Shade>
        }

        return (
          <DocumentTitle title='服务详情'>
            <div className='oldService-detail'>
              <ServiceHead type='oldDetail' item={item}></ServiceHead>
              <div className='service-tab'>
                <Tabs>
                  <TabPane tab="活动描述" key="1">
                    <div className='content'>
                      <div className='news-title' dangerouslySetInnerHTML={{ __html: item.data.content }} />
                    </div>
                  </TabPane>
                  <TabPane tab="用户评价" key="2">
                    <div className='page-commentList'>
                      {
                        commentText
                      }
                    </div>
                  </TabPane>
                </Tabs>
                {bottomButton}
              </div>
              {show}
              {showAdd}
            </div>
          </DocumentTitle>
        );
      }
      else {
        return <DocumentTitle title='服务详情'><Loading /></DocumentTitle>
      }

    }
  }
}

export default OldServiceDetail;

