import React from 'react'
import { Button, TouchableOpacity, Text, View, StatusBar, TextInput } from 'react-native'
import { Video } from 'expo'
import LabelButton from '../LabelButton'
import styles from './styles'

const LoginComponent = (props) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.logoText}>Weekly Workouts</Text>
        <Button
          onPress={() => props.login()}
          title="Login with Facebook"
          color="#3b5998"
          accessibilityLabel="Log in to Weekly Workouts App."
          style={styles.button}
        />
      </View>
      <Video source={require('../../../Public/Assets/runner-video.mp4')} shouldPlay isMuted isLooping resizeMode={'cover'} style={styles.video}/>

    </View>
  )
}

export default LoginComponent
