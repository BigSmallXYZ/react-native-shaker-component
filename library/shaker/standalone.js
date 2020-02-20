/* globals alert */

import React, { useEffect, useState, useMemo } from 'react'

import useTimeout from 'use-timeout'

import Warn from './components/warn'
import Header from './components/header'
import Circle from './components/circle'
import TextBox from './components/textBox'
import Progress from './components/progress'

import {
  Keyboard,
  Platform,
  View,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native'

import * as api from './helpers/api'

import { View as RNAView } from 'react-native-animatable'

import uuid from 'uuid'

const sessionName = uuid()

export default function Shaker (Component, params = {}) {
  const {
    enabled = true,
    displayFeedbackWarn = true,
    shakeTimes = 1,
    projectId,
    detectShakeFn,
    takeScreenshot: captureScreen
  } = params

  if (!enabled) return Component

  return function ShakerElement () {
    const [warnVisible, setVisibility] = useState(0)
    const [capturedInfo, setCapturedInfo] = useState({})
    const [openFeedbacker, setOpenFeedbacker] = useState(false)
    const [feedbacks, setFeedback] = useState([])
    const [activeFeedback, setActiveFeedback] = useState(null)
    const [keyboardPosition, setKeyboardPosition] = useState(0)
    const [progress, setProgress] = useState(null)

    useEffect(() => {
      if (!projectId) {
        alert('You should send a valid projectId')
        return void (0)
      }

      api.checkIfExists({ projectId })
        .then(({ exists }) => {
          if (!exists) {
            alert('You should send a valid projectId')
          }
        }).catch(err => {
          console.error(err)
        })
    }, [projectId])

    useEffect(() => {
      const fnShow = e => {
        if (Platform.OS === 'android') {
          setKeyboardPosition(-25)
        } else {
          setKeyboardPosition(e.endCoordinates.height - 25)
        }
      }

      const fnHide = () => {
        setKeyboardPosition(0)
      }

      Keyboard.addListener('keyboardDidShow', fnShow)
      Keyboard.addListener('keyboardWillShow', fnShow)
      Keyboard.addListener('keyboardDidHide', fnHide)
      Keyboard.addListener('keyboardWillHide', fnHide)

      return () => {
        Keyboard.removeListener('keyboardDidShow', fnShow)
        Keyboard.removeListener('keyboardWillShow', fnShow)
        Keyboard.removeListener('keyboardDidHide', fnHide)
        Keyboard.removeListener('keyboardWillHide', fnHide)
      }
    }, [setKeyboardPosition])

    useTimeout(() => setVisibility(1), 2000)
    useTimeout(() => setVisibility(2), 6000)

    const changeViaUid = (uid, params) => {
      setFeedback(feedbacks.map(d => {
        if (d.uid === uid) return { ...d, ...params }
        return d
      }))
    }

    const capture = useMemo(() => {
      return async () => {
        if (openFeedbacker === true) return void (0)

        const info = await captureScreen()

        setCapturedInfo(info)
        setOpenFeedbacker(true)
      }
    }, [openFeedbacker, setCapturedInfo])

    useEffect(() => {
      if (detectShakeFn) {
        detectShakeFn({
          shakeTimes,
          capture
        })
      }
    }, [capture])

    const save = useMemo(() => {
      return async () => {
        try {
          // GET SIGNED URL
          setActiveFeedback(null)
          const filename = `${uuid()}.jpg`
          setProgress(10)
          const { url: signedUrl, headers } = await api.getSignedUrl({
            filename,
            contentType: 'image/jpeg'
          })
          setProgress(33)

          // UPLOAD IMAGE
          const { url } = await api.uploadToS3({
            signedUrl,
            headers,
            uri: capturedInfo.uri,
            filename
          })
          setProgress(66)
          // SAVE

          await api.saveFeedback({
            sessionName,
            projectId,
            screenshot: url,
            positionScreenX: capturedInfo.positionScreenX,
            positionScreenY: capturedInfo.positionScreenY,
            feedbacks,
            phoneInfo: {
              dimensions: Dimensions.get('screen'),
              platform: {
                os: Platform.OS,
                version: Platform.Version,
                manufacturer: capturedInfo.manufacturer,
                model: capturedInfo.model,
                isIpad: Platform.isPad,
                isTV: Platform.isTV,
                isTVOS: Platform.isTVOS
              }
            }
          })
          setProgress(100)
          // SET EVERYTHING TO NULL

          alert('Feedback saved')

          setActiveFeedback(null)
          setFeedback([])
          setCapturedInfo(null)
          setOpenFeedbacker(false)
          setProgress(null)

        } catch (err) {
          alert('Something went wrong. Try again.')
          setProgress(null)
        }
      }
    }, [
      setActiveFeedback,
      setFeedback,
      setCapturedInfo,
      setOpenFeedbacker,
      setProgress,
      capturedInfo,
      projectId,
      feedbacks
    ])

    const close = useMemo(() => {
      return () => {
        if (feedbacks.length > 0) {
          // Works on both Android and iOS
          Alert.alert(
            'Do you really want to close?',
            'Any feedback that you created will be lost',
            [
              {
                text: 'Close anyway',
                onPress: () => {
                  setActiveFeedback(null)
                  setFeedback([])
                  setCapturedInfo(null)
                  setOpenFeedbacker(false)
                },
                style: 'cancel'
              },
              { text: 'Get me back', onPress: () => {} }
            ],
            { cancelable: false }
          )
        } else {
          setOpenFeedbacker(false)
        }
      }
    }, [feedbacks, setFeedback])

    const removeFeedback = useMemo(() => {
      return uid => {
        try {
          // ReactNativeHapticFeedback.trigger('impactLight', options)
        } catch (err) {}
        if (activeFeedback === uid) setActiveFeedback(null)
        setFeedback(feedbacks.filter(d => d.uid !== uid))
      }
    }, [feedbacks, setFeedback, setActiveFeedback, activeFeedback])

    return (
      <>
        <Component />
        {openFeedbacker && (
          <View
            style={{
              backgroundColor: 'transparent',
              zIndex: 99999,
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <RNAView
              animation='slideInDown'
              duration={500}
            >
              {progress !== null ? (
                <Progress progress={progress} />
              ) : (
                <Header
                  active={activeFeedback !== null}
                  onPressClose={close}
                  onPressCheck={save}
                  title={activeFeedback != null ? 'Long press to remove a feedback' : 'Tap anywhere to add a feedback.'}
                />
              )}
            </RNAView>
            <TouchableOpacity
              activeOpacity={1}
              style={{ flex: 1 }}
              onPress={e => {
                if (progress !== null) return void (0)

                const uid = uuid()
                const { pageX, pageY } = e.nativeEvent
                setFeedback([...feedbacks, { pageX, pageY, text: '', uid }])
                setActiveFeedback(uid)
              }}
            />
            {feedbacks.map((d, i) => (
              <Circle
                key={`circle-${d.uid}`}
                selected={activeFeedback === d.uid}
                text={i + 1}
                left={d.pageX}
                top={d.pageY}
                onLongPress={() => removeFeedback(d.uid)}
                onPress={() => setActiveFeedback(d.uid)}
              />
            ))}
            {activeFeedback !== null && (
              <RNAView transition='bottom' easing='linear' duration={200} style={{ position: 'absolute', bottom: 20 + keyboardPosition, width: '100%', padding: 20, right: 0 }}>
                <TextBox
                  value={(feedbacks.find(d => d.uid === activeFeedback) || {}).text || ''}
                  onChangeText={text => changeViaUid(activeFeedback, { text })}
                  onSubmit={() => setActiveFeedback(null)}
                />
              </RNAView>
            )}
          </View>
        )}
        {displayFeedbackWarn && warnVisible !== 0 && (
          <Warn
            show={warnVisible === 1}
            onAnimationEnd={() => warnVisible === 2 && setVisibility(0)}
            title='Want to give any feedback?'
            text={`Shake ${shakeTimes}x your phone and start giving feedback`}
          />
        )}
      </>
    )
  }
}
