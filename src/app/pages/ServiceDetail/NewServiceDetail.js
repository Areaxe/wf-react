import React from 'react';
import ServiceHead from '../../components/ServerHead/ServerHead';
import DocumentTitle from 'react-document-title';
import style from './NewServiceDetail.scss';
import { message } from 'antd'
import { Link } from 'react-router'
import DetailHead from '../../components/DetailHead/DetailHead';
import fwIcon from '../../images/zuixinfuwu.png';
import BottomButton from '../../components/Button/CustomButton';
import Shade from '../../components/Shade/ScreenShade';
import Loading from '../../components/Shade/Loading';
import IfReservation from '../../components/CenterContents/PromptDialog';
import promtTopImg from '../../images/service.png'
import lastIcon from '../../images/daojishi@3x.png'

class NewServiceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReservation: false,
      opt: '',
      isfirst: true,
    }
  }

  componentDidMount() {
    let serviceId = this.props.params._id
    this.props.actions.serviceDetail(serviceId)
  }

  componentWillMount() {
    if (!this.props.states.service.serviceInfo) {
      let serviceId = this.props.params._id
      this.props.actions.serviceDetail(serviceId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states.service.serviceInfo === null && this.state.isfirst) {
      let serviceId = nextProps.params._id
      this.props.actions.serviceDetail(serviceId)
    }
    this.setState({
      isfirst: false,
    })
  }

  _cancle() {
    this.setState({
      showReservation: true,
      opt: 'unregist',
    })
  }

  _reservation() {
    return this._showIfReservation()
  }

  _showIfReservation() {
    let states = this.props.states
    if (states.project.wxUser && !states.project.wxUser.phone && states.login.checkCode !== 200 && !states.login.loginIn) {
      this.props.history.replace('/login')
    } else {
      this.setState({
        showReservation: true,
        opt: 'regist',
      })
    }
  }

  _cancleReservation() {
    this.setState({
      showReservation: false,
    })
    return false
  }

  _reservationSure() {
    let states = this.props.states
    if (this.state.opt === 'regist') {
      if (states.project.wxUser && !states.project.wxUser.phone) {
        states.project.wxUser.phone = states.login.phone
      }
      this.props.actions.serviceRegist(this.props.params._id, states.project.wxUser, states.service.serviceInfo, states.service.serviceList)
    } else {
      this.props.actions.serviceClose(this.props.params._id, states.service.serviceInfo, 'detail', states.service.serviceList)
    }
    this.setState({
      showReservation: false,
    })
  }

  render() {
    let serData, orginazerHead, item
    if (this.props.states.service.serviceInfo) {
      serData = this.props.states.service.serviceInfo[0]
    }

    if (serData) {
      item = {
        type: 'detail',
        data: serData,
      }

      orginazerHead = {
        tip: item.data.organizer.name,
        imgLink: item.data.organizer.logo.url + '@128h_128w_1e_1c',
        id: item.data.organizer._id,
        startTime: item.data.startTime,
      }
      let serDetailHead = {
        tip: '活动详情',
        imgLink: fwIcon,
      }
      let bottomButton = ''
      if (item.data.userStatus) {
        switch (item.data.userStatus.registState) {
          case 'unregist':
            if (item.data.status === 'full') {
              bottomButton = <Link to={`/service`}><BottomButton>您来晚了，查看其他服务吧</BottomButton></Link>
            } else {
              let userId = localStorage.getItem('acct_userId');
              let bool = false
              for (let obj of item.data.registions) {
                if ((obj.user._id && obj.user._id === userId) || (!obj.user._id && obj.user === userId)) {
                  bool = true
                  bottomButton =
                    <div className='bottom'><BottomButton type='primary' disabled>不能再次预约此服务</BottomButton></div>
                  break
                }
              }
              if (!bool) {
                bottomButton = <div className='bottom'><BottomButton type='primary'
                  onClick={this._showIfReservation.bind(this)}>预约</BottomButton>
                </div>
              }
            }
            break
          case 'registed':
            bottomButton = <div className="bottom">
              <div className="endTime-text">预约成功啦！等你来哦！</div>
              <div className="cancle-button"><BottomButton onClick={this._cancle.bind(this)}
                type='warming'>取消预约</BottomButton></div>
            </div>
            break
          default:
            let userId = localStorage.getItem('acct_userId');
            let bool = false
            for (let obj of item.data.registions) {
              if ((obj.user._id && obj.user._id === userId) || (!obj.user._id && obj.user === userId)) {
                bool = true
                bottomButton = <div className='bottom'><BottomButton disabled>不能再次预约此服务</BottomButton></div>
                break
              }
            }
            if (!bool) {
              bottomButton = <div className='bottom'><BottomButton type='primary'
                onClick={this._showIfReservation.bind(this)}>预约</BottomButton>
              </div>
            }
        }
      } else {
        switch (item.data.status) {
          case 'accept':
            bottomButton =
              <div className='bottom'><BottomButton onClick={this._showIfReservation.bind(this)}>预约</BottomButton></div>
            break
          case 'full':
            bottomButton = <div className='bottom'><BottomButton>您来晚了，查看其他服务吧</BottomButton></div>
            break
        }
      }

      let promtInfo = {
        topImg: promtTopImg,
        btn1Click: this._cancleReservation.bind(this),
        btn2Click: this._reservationSure.bind(this),
        btnText1: '取消',
        btnText2: '确定',
        mainText: this.state.opt === 'regist' ? '确定预约？' : '取消后将不能再预约此服务',
      }
      let shadeInfo = ''
      if (this.state.showReservation) {
        shadeInfo = <Shade type='center'><IfReservation data={promtInfo}></IfReservation></Shade>
      }
      else {
        shadeInfo = ''
      }
      return (
        <DocumentTitle title='服务详情'>
          <div className='service-detail'>
            <ServiceHead type='detail' item={item}></ServiceHead>
            <Link className='serDetail-whomeInfo' to={`/whDetail/${orginazerHead.id}`}>
              <DetailHead info={orginazerHead}></DetailHead>
            </Link>
            <div className='content'>
              <div className='news-title'>
                <DetailHead info={serDetailHead}></DetailHead>
              </div>
              <div className="detail_div_content" dangerouslySetInnerHTML={{ __html: item.data.content }}></div>
            </div>
            {bottomButton}
            {shadeInfo}
          </div>
        </DocumentTitle>
      );
    }
    else {
      return <DocumentTitle title='服务详情'><Loading /></DocumentTitle>
    }
  }
}

export default NewServiceDetail;

