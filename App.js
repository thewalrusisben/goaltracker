import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import Login from './App/Components/Login'
import Log from './App/Components/Log'

const MainNavigationStack = StackNavigator({
  Login: { screen: Login },
  Log: { screen: Log }
})

export default class App extends React.Component {
  render() {
    return (
      <MainNavigationStack />
    )
  }
}
