import React, { Component } from 'react'
import LabelButtonComponent from './LabelButton'

class LabelButton extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <LabelButtonComponent
        buttonType={this.props.buttonType}
        label={this.props.label}
        method={this.props.method}
      />
    )
  }
}

export default LabelButton
