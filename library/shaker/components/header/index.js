import React from 'react'

import style from './style'

import { View, SafeAreaView, Text, TouchableWithoutFeedback } from 'react-native'

export default function Header ({ active, title, onPressClose, onPressCheck }) {
  return (
    <View style={[style.header, active && style.headerActive]}>
      <SafeAreaView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableWithoutFeedback onPress={onPressClose} hitSlop={{ top: -10, left: -10, right: -10, bottom: -10 }}>
          <Text allowFontScaling={false} style={style.close}>×</Text>
        </TouchableWithoutFeedback>
        <Text allowFontScaling={false} style={style.headerText}>{title}</Text>
        <TouchableWithoutFeedback onPress={onPressCheck} hitSlop={{ top: -10, left: -10, right: -10, bottom: -10 }}>
          <Text allowFontScaling={false} style={style.send}>Send</Text>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  )
}
