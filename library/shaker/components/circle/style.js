import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#2ecc71',
    borderWidth: 2,
    borderColor: '#27ae60',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28
  },

  selected: {
    backgroundColor: '#9b59b6',
    borderColor: '#8e44ad'
  },

  text: {
    fontSize: 12,
    color: '#fff'
  }
})
