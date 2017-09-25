import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  primaryContainer: {
    borderWidth: 1,
    borderColor: 'green',
    width: 125,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  primaryButtonText: {
    color: 'green',
    fontSize: 18
  },
  secondaryContainer: {
    borderWidth: 1,
    borderColor: 'red',
    width: 125,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  secondaryButtonText: {
    color: 'red',
    fontSize: 18
  }
})

export default styles
