import React, { Component } from 'react'
import { Alert, AsyncStorage } from 'react-native'
import axios from 'axios'
import LoginComponent from './Login'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: undefined,
      password: undefined
    }
    this.fbLogin = this.fbLogin.bind(this)
    this.storeLoginCredentials = this.storeLoginCredentials.bind(this)
    this.clearPriorUser = this.clearPriorUser.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  async clearPriorUser () {
    try {
      await AsyncStorage.removeItem('user')
    } catch (error) {
      Alert.alert('Error', 'Oops, something went wrong.', [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancellable: true })
    }
  }

  async storeLoginCredentials (name, surname, fbUserId) {
    try {
      await AsyncStorage.setItem('user', JSON.stringify({name, surname, fbUserId}), (error) => {
        if (error) {
          console.error(error)
          Alert.alert('Error!', 'Oops, something went wrong.', [{text: 'OK', onPress: () => console.log('OK Pressed')}], {cancellable: true})
        } else {
          console.log('foo')
          axios.post('http://192.168.0.6:8081/workouts/user', {facebookId: fbUserId})
          .then((results) => {
            this.props.navigation.navigate('Log', { name, surname, fbUserId })
          })
        }
      })
    } catch (error) {
      console.error(error)
      Alert.alert('Error!', 'Oops, something went wrong.', [{text: 'OK', onPress: () => console.log('OK Pressed')}], {cancellable: true})
    }
  }

  async fbLogin() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('350074562103528', {permissions: ['public_profile']},)
    if (type === 'success') {
      axios(`https://graph.facebook.com/me?access_token=${token}`)
      .then((response) => {
        this.clearPriorUser()
        .then(() => {
          const name = response.data.name.split(' ')[0]
          const surname = response.data.name.split(' ')[1]
          this.storeLoginCredentials(name, surname, response.data.id)
        })
      })
    } else {
      alert('Sign In Error', 'There was an error connecting to your Facebook account. Please try again later!')
    }
  }

  componentWillMount () {
    AsyncStorage.getItem('user', (error, data) => {
      if (error) {
        Alert.alert('Error', error, { cancellable: true })
      } else if (data) {
        const { name, surname, fbUserId } = JSON.parse(data)
        console.log(data)
        this.props.navigation.navigate('Log', { name, surname, fbUserId })
      } else {
        this.fbLogin()
      }
    })
  }

  render () {
    return (
      <LoginComponent login={() => this.fbLogin()}/>
    )
  }
}

export default Login
