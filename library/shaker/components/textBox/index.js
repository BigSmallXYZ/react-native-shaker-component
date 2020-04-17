import React from 'react'

import {
  View,
  TextInput
} from 'react-native'

import CircularButton from '../CircularButton'

const style = {
  container: {
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#F6F6F9',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50
  },

  inside: {
    backgroundColor: '#F6F6F9',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 20,
    padding: 10
  },

  input: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: -5,
    flex: 1
  }
}

function SendButton (props) {
  return (
    <CircularButton
      {...props}
      icon='✓'
    />
  )
}

function Input (props) {
  return (
    <View style={style.input}>
      <TextInput
        enableScrollToCaret
        autoFocus
        placeholder='Type something...'
        {...props}
      />
    </View>
  )
}

export default function TextBox ({ value, disabled, onChangeText, onSubmit }) {
  return (
    <View
      style={style.container}
    >
      <View style={style.inside}>
        <Input
          value={value}
          onChangeText={onChangeText}
        />
        <SendButton
          disabled={disabled}
          onPress={onSubmit}
        />
      </View>
    </View>
  )
}
