import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Dimensions, ImageBackground, Animated, Easing } from 'react-native'
import BottomSvg from '../../Assets/Images/Backgrounds/Bottom.svg'
import LeftSvg from '../../Assets/Images/Backgrounds/Left.svg'
import RightSvg from '../../Assets/Images/Backgrounds/Right.svg'
import * as helpers from 'App/Helpers/helpers'

const SlideIn = ({fromValue, toValue, position, children, left}) => {
  const [startValue] = useState(new Animated.Value(fromValue))
  React.useEffect(() => {
    Animated.timing(
      startValue,
      {
        toValue: toValue,
        duration: 600,
      }
    ).start();
  }, [])


  return (
    <Animated.View
      style={{
        height: Math.round(Dimensions.get('window').height),
        width: Math.round(Dimensions.get('window').width),
        position: 'absolute',
        zIndex: 0,
        left: left,
        [position]: startValue,

      }}
    >
      {children}
    </Animated.View>
  )
}


const Background = ({numContacts, isInfected}) => {
    return (
      <Fragment>
        <SlideIn fromValue={-1000} left='auto' toValue={-80} position='right'>
          <RightSvg
            width="100%"
            height="70%"
            fill={helpers.getStatusAttributes(numContacts, isInfected).color.right}
          />
        </SlideIn>
        <SlideIn fromValue={-1000} left='auto'  toValue={-150} position='left'>
          <LeftSvg
            width="100%"
            height="70%"
            fill={helpers.getStatusAttributes(numContacts, isInfected).color.left}
          />
        </SlideIn>
        <SlideIn fromValue={-1000} left={-30}  toValue={-320} position='bottom'>
          <BottomSvg
            width="100%"
            height="70%"
            fill={helpers.getStatusAttributes(numContacts, isInfected).color.bottom}
          />
        </SlideIn>
      </Fragment>
    )
}


export default Background