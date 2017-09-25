import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import styles from './styles'

const LabelButtonComponent = (props) => {
  let containerStyle, buttonText
  if (props.buttonType === 'primary') {
    containerStyle = styles.primaryContainer
    buttonText = styles.primaryButtonText
  } else {
    containerStyle = styles.secondaryContainer
    buttonText = styles.secondaryButtonText
  }
  return (
    <TouchableHighlight
      style={containerStyle}
      activeOpacity={1}
      underlayColor='white'
      onPress={() => props.method()}
      >
      <Text style={buttonText}>{props.label}</Text>
    </TouchableHighlight>
  )
}

export default LabelButtonComponent
