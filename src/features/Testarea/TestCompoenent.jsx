import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Button} from 'semantic-ui-react'

import {incrementCounter, decrementCounter} from './testActions'

class TestCompoenent extends Component {
  render() {
    const {incrementCounter, decrementCounter, answer} = this.props;
    return (
      <div>
          <h1>Test Area</h1>
          <h3>The answer is { answer }</h3>
          <Button onClick={ incrementCounter } color="green" content="Increment" />
          <Button onClick={ decrementCounter } color="red" content="Decrement" />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  answer: state.test.answer
})

const actions = {
  incrementCounter,
  decrementCounter
}

export default connect(mapStateToProps, actions)(TestCompoenent)