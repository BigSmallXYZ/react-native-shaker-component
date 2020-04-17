import React from 'react'

import { View, TouchableOpacity, ImageBackground, Text } from 'react-native'

const style = {
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  disabled: {
    opacity: 0.6
  }
}

export default function CircularButton ({ size, disabled, color, iconColor = '#fff', icon, onPress }) {
  const Component = disabled ? View : TouchableOpacity
  return (
    <Component onPress={onPress}>
      <ImageBackground
        resizeMode='contain'
        source={require('./button.png')}
        style={[style.button, disabled && style.disabled, color && { backgroundColor: color }]}
      >
        <Text style={{ color: iconColor, fontSize: size }}>{icon}</Text>
      </ImageBackground>
    </Component>
  )
}
