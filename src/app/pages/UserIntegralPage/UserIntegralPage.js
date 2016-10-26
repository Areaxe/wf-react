import React, { Component, PropTypes, findDOMNode } from 'react';
import UserIntegral from '../../components/UserIntegral/UserIntegral';
import DocumentTitle from 'react-document-title';
import Loading from '../../components/Shade/Loading'

export default class UserIntegralPage extends Component {
    constructor(props) {
    super(props);
    this.state = {
      isFirst: true,
    };
  }

  componentWillMount() {
    if (this.props.states.project.token) {
      this.props.actions.pointFetch(this.props.states.project.token)
    }
  }

  render() {
    let personalPoint = this.props.states.personal.point
    if (personalPoint) {
      return (
        <DocumentTitle title='个人积分'>
          <div>
            <UserIntegral data={personalPoint} />
          </div>
        </DocumentTitle>
      );
    } else {
      return (
        <DocumentTitle title='个人积分'>
          <Loading />
        </DocumentTitle>
      );
    }

  }
}