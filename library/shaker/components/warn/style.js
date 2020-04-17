import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 10,
    left: 10,
    backgroundColor: '#f1c40f',
    padding: 10,
    // borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
    color: '#fff'
  },

  text: {
    color: '#fff'
  }
})
