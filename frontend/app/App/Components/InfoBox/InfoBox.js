
import React from 'react'
import {Text} from 'react-native'
import styled from 'styled-components'
import * as S from 'App/Theme/SharedComponents'
import { ApplicationStyles, Colors, Images, Metrics } from 'App/Theme'

const $BoxContainer = styled.View`
 background: ${Colors.white};
 padding: ${ApplicationStyles.padding.medium};
 border-radius: 5px;
 margin-top: ${ApplicationStyles.margin.medium}
`

const InfoBox  = ({amountContacts, infoText}) => {

  return(
    <$BoxContainer>
      <S.MediumText style={{textAlign: 'center'}}>In den letzten 24 Stunden hattest du</S.MediumText>
      <S.ExtraLargeText style={{padding: 10, textAlign: 'center'}}>{amountContacts} Kontakte</S.ExtraLargeText>
      <S.RegularText style={{textAlign: 'center'}}>{infoText}</S.RegularText>
    </$BoxContainer>
  )


}

export default InfoBox
