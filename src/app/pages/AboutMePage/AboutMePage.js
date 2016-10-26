import React, { Component, PropTypes } from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import ButtonLight from '../../components/Button/CustomButton';
import AboutMe from '../../components/AboutMe/AboutMe';
import Menu from '../../components/Menu/Menu';
import DocumentTitle from 'react-document-title';
import Loading from '../../components/Shade/Loading'


export default class LoginPage extends Component {

	componentWillMount() {
		if (!this.props.states.personal.userBaseInfo) {
			this.props.actions.getBaseInfoFetch()
		}
	}

	render() {
		let baseInfo = ''
		if (this.props.states.personal.userBaseInfo) {
			baseInfo = this.props.states.personal.userBaseInfo[0]
		}
		if (baseInfo) {
			return (
				<DocumentTitle title='我'>
					<div>
						<AboutMe data={baseInfo} />
						<Menu index="3" />
					</div>
				</DocumentTitle>
			);
		} else {
			return <DocumentTitle title='我'>
				<Loading />
			</DocumentTitle>

		}

	}
}

