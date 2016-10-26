import React, { Component, PropTypes } from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import LoginOutBtn from '../../components/Button/CustomButton';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import DocumentTitle from 'react-document-title';
import style from './PersonalInfoPage.scss';
import Loading from '../../components/Shade/Loading'

export default class PersonalInfoPage extends Component{
  componentWillMount(){
		this.props.actions.getBaseInfoFetch()			
	}
  render(){
    let userInfo
    if(this.props.states.personal.userBaseInfo){
       userInfo = this.props.states.personal.userBaseInfo[0]
    }
    if(userInfo){
return (
      <DocumentTitle title='个人信息'>
        <div>
          <PersonalInfo data={userInfo} />
          <div className='sign-out-btn'>
          </div>
        </div>
      </DocumentTitle>
      );
    }else{
      return (
      <DocumentTitle title='个人信息'>
        <Loading />
      </DocumentTitle>
      );
    }
    
  }
}
