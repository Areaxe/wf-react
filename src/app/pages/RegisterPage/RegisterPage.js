import React from 'react'
import DocumentTitle from 'react-document-title'
import Button from '../../components/Button/CustomButton'
import regSuccess from '../../images/regisOK.png'
import regError from '../../images/regisError.png'
import {Link} from 'react-router'
import style from './RegisterPage.scss'


export default class ServicePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerState: false,
            remindtext: '',
            remindImg: regSuccess,
        };
    }
    componentWillMount() {
        let serviceId = this.props.params._serviceId;
        this.props.actions.signIn(serviceId)  //页面请求服务签到数据
        this.props.actions.serviceDetail(serviceId) //获取服务信息
    }
    render() {
        let siginInfo
        let bottomButtom = ''
        let renderText = ''
        let remindImg = ''
        let organizeName = ''
        let serviceInfo = ''
        let userId = ''
        if (this.props.states.personal.signService && this.props.states.service.serviceInfo) {  //如果获取到数据
            siginInfo = this.props.states.personal.signService
            serviceInfo = this.props.states.service.serviceInfo[0]
            userId = localStorage.getItem('acct_userId')
            switch (siginInfo.code) {
                case 2014:
                    renderText = '签到成功'
                    organizeName = serviceInfo.organizer.name;
                    bottomButtom = <Link to={`/service/${serviceInfo._id}`}><Button type="light-blue">查看服务信息</Button></Link>
                    break
                case 200:
                    renderText = '签到成功'
                    organizeName = serviceInfo.organizer.name;
                    bottomButtom = <Link to={`/service/${serviceInfo._id}`}><Button type="light-blue">查看服务信息</Button></Link>
                    break
                case 2015:
                    renderText = '人数已满'
                    break
                case 2011:
                    organizeName = serviceInfo.organizer.name;
                    renderText = '您未预约该服务'
                    bottomButtom = <Link to={`/user/${userId}/serviceAbout`}><Button type="light-blue">查看我预约的服务</Button></Link>
                    break
                case 2019:
                    organizeName = serviceInfo.organizer.name;
                    renderText = '您未预约该服务'
                    bottomButtom = <Link to={`/user/${userId}/serviceAbout`}><Button type="light-blue">查看我预约的服务</Button></Link>
                    break
            }
        }


        if (siginInfo && serviceInfo) {
            return (
                <DocumentTitle title='签到'>
                    <div className="register-page">
                        <div className="center-container">
                            <div className="heade">
                                {organizeName}
                            </div>
                            <div className="main-content">
                                <p className="tips">{renderText ? renderText : this.state.remindtext}</p>
                                <img className="main-img" src={this.state.remindImg} />
                            </div>
                            <div className="button">
                                {bottomButtom}
                            </div>
                        </div>
                    </div>
                </DocumentTitle>
            )
        } else {
            return (
                <DocumentTitle title='签到'>
                    <div className="register-page">
                        
                    </div>
                </DocumentTitle>
            )
        }

    }
}