import React from 'react'

import { View, SafeAreaView } from 'react-native'

export default function Progress ({ progress = 0 }) {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: '#74b9ff', width: '100%' }}>
      <SafeAreaView style={{ backgroundColor: '#0984e3', minHeight: 5, width: `${progress}%` }} />
    </View>
  )
}
