import React from 'react'

import style from './style'

import { View } from 'react-native-animatable'
import { Text } from 'react-native'

export default function Warn ({ title, text, onAnimationEnd, show = true }) {
  return (
    <View
      animation={show ? 'slideInUp' : 'slideOutDown'}
      onAnimationEnd={onAnimationEnd}
      duration={500}
      style={style.container}
    >
      <Text style={style.title}>{title}</Text>
      <Text style={style.text}>{text}</Text>
    </View>
  )
}
