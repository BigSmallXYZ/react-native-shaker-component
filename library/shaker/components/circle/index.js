import React from 'react'

import style from './style'

import { TouchableOpacity, Text } from 'react-native'

export default function Circle ({ onPress, onLongPress, selected, text, top, left }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        style.container,
        top && { top },
        left && { left },
        selected && style.selected
      ]}
    >
      <Text style={style.text}>{text}</Text>
    </TouchableOpacity>
  )
}
