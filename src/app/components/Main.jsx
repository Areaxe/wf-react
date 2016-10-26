import React from 'react';
import { bindActionCreators } from 'redux'

import ActionCreators from '../actions'
import configureStore from '../store'

const store = configureStore();
const actions = bindActionCreators(ActionCreators, store.dispatch);

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      states: store.getState().toJS(),
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        states: store.getState().toJS(),
      })
    })
    actions.initFetch(actions.updateProjectData)
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.route)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
            actions: actions,
            states: this.state.states,
        })}
      </div>
     );
  }
}

export default Main
