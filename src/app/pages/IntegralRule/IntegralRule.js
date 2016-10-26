import React, { Component, PropTypes, findDOMNode } from 'react';
import DocumentTitle from 'react-document-title';
import style from './IntegralRule.scss'
import Loading from '../../components/Shade/Loading'

export default class IntegralRule extends Component {
    //获取用户积分规则
    componentWillMount() {
        if (this.props.states.systemConfig.integralRule) {
            this.props.actions.getSystemConfig()
        }
    }

    render() {
        let thisRule = ''
        if (this.props.states.systemConfig.integralRule) {
            let integralRuleList = this.props.states.systemConfig.integralRule
            let regionId = localStorage.getItem('region_id')
            integralRuleList.map((val, i) => {
                if (regionId.match(val.region)) {
                    thisRule = val.value
                }
            })

            return (
                <DocumentTitle title='积分规则'>
                    <div className="integral-ruleContainer" dangerouslySetInnerHTML={{__html: thisRule}}>
                    </div>
                </DocumentTitle>
            )
        }

        else {
            return (
                <DocumentTitle title='积分规则'>
                    <Loading />
                </DocumentTitle>
            )
        }
    }
}
