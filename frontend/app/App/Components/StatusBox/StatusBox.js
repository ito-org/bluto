import React from 'react'
import {Text} from 'react-native'
import styled from 'styled-components'
import * as S from 'App/Theme/SharedComponents'
import { ApplicationStyles, Colors, Images, Metrics } from 'App/Theme'

const $BoxContainer = styled.View`
 background: ${Colors.blue};
 padding: ${ApplicationStyles.padding.medium};
 border-radius: 5px;
`



const StatusBox  = ({statusText}) => {


  return(
    <$BoxContainer>
      <S.MediumText style={{color: Colors.white, textAlign: 'center'}}>{statusText}</S.MediumText>
    </$BoxContainer>
  )


}

export default StatusBox
