import React from 'react'

import style from './style'

import { TouchableOpacity, Text, ImageBackground } from 'react-native'

export default function Circle ({ onPress, onLongPress, selected, text, top, left }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        style.container,
        top && { top },
        left && { left }
      ]}
    >
      <ImageBackground
        resizeMode='contain'
        style={style.bg}
        source={selected ? require('./circle2.png') : require('./circle1.png')}
      >
        <Text style={style.text}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}
