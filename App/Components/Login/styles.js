import { StyleSheet } from 'react-native'
import { Constants } from 'expo'

const styles = StyleSheet.create({
  video: {
    zIndex: 1,
    height: 700,
    width: 700,
    position: 'absolute',
  },
  container: {
    flex: 1,
    zIndex: 2,
    position: 'relative',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(000,000,000, .5)',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '500',
    color: 'white'
  },
  button: {
    height: 20000
  },
  buttonRow: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default styles
