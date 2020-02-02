import React from 'react'

import { View, TouchableOpacity, Text } from 'react-native'

const style = {
  button: {
    width: 40,
    height: 40,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B4BDF'
  },

  disabled: {
    opacity: 0.6
  }
}

export default function CircularButton ({ size, disabled, color, iconColor = '#fff', icon, onPress }) {
  const Component = disabled ? View : TouchableOpacity
  return (
    <Component onPress={onPress}>
      <View style={[style.button, disabled && style.disabled, color && { backgroundColor: color }]}>
        <Text style={{ color: iconColor, fontSize: size }}>{icon}</Text>
      </View>
    </Component>
  )
}
