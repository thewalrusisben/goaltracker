import React from 'react'
import { Text, View } from 'react-native'
import LabelButton from '../LabelButton'

const LogComponent = (props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'black'}}>
      <Text style={{color: 'white', fontSize: 32}}>Did you exercise today?</Text>
      <LabelButton method={() => props.logWorkout('completed')} buttonType='primary' label='yes' styles={{width: 150, height: 25}} />
      <LabelButton method={() => props.logWorkout('skipped')} buttonType='secondary' label='no' styles={{width: 150, height: 25}} />
    </View>
  )
}

export default LogComponent
