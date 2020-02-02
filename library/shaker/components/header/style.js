import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  header: {
    paddingBottom: 2,
    paddingHorizontal: 10,
    backgroundColor: '#5B4BDF',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 5
  },

  headerActive: {
    backgroundColor: '#8e44ad'
  },

  headerText: {
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
    color: '#FFF'
  },

  close: {
    width: 40,
    marginTop: -5,
    fontSize: 30,
    color: '#FFF'
  },

  send: {
    textAlign: 'right',
    width: 40,
    marginTop: -2,
    fontSize: 17,
    color: '#FFF'
  }
})
