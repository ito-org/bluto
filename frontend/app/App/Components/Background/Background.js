import React, { Fragment, Component } from 'react'
import styled from 'styled-components'
import { Dimensions, ImageBackground, Animated } from 'react-native'
import BottomSvg from '../../Assets/Images/Backgrounds/Bottom.svg'
import LeftSvg from '../../Assets/Images/Backgrounds/Left.svg'
import RightSvg from '../../Assets/Images/Backgrounds/Right.svg'


const $Container = styled.View`
height: ${Math.round(Dimensions.get('window').height)}px;
width: ${Math.round(Dimensions.get('window').width)}px;
position: absolute;
`

const $Bottom = styled.View`
bottom: -350px;
position: absolute;
left: -30px;
flex: 1;
height: ${Math.round(Dimensions.get('window').height)}px;
width: ${Math.round(Dimensions.get('window').width)}px;
`

const $BottomAnimated = Animated.createAnimatedComponent($Bottom)

const $Right = styled.View`
top: 0px;
position: absolute;
z-index: 0;
right: -80px;
flex: 1;
height: ${Math.round(Dimensions.get('window').height)}px;
width: ${Math.round(Dimensions.get('window').width)}px;
`

const $Left = styled.View`
top: 0px;
position: absolute;
z-index: 0;
left: -150px;
flex: 1;
height: ${Math.round(Dimensions.get('window').height)}px;
width: ${Math.round(Dimensions.get('window').width)}px;
`



class Background extends Component {
  constructor(props) {
    super(props);
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {

    Animated.loop(
      Animated.timing(this.animation, {toValue: 1, duration: 2000})
    ).start();
  }

  render() {
    const rotation = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })


    return (
      <Fragment>

        <$Right>
          <RightSvg
            width="100%"
            height="70%"
          />
        </$Right>
        <$Left>
          <LeftSvg
            width="100%"
            height="70%"
          />
        </$Left>
        <$BottomAnimated  style={{ transform: [{ rotate: rotation }] }}>
          <BottomSvg
            width="100%"
            height="70%"
          />
        </$BottomAnimated>
      </Fragment>
    )
  }
}


export default Background