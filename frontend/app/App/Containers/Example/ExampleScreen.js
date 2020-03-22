import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import * as Buttons from 'App/Components/Buttons/Buttons'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import StatusBox from '../../Components/StatusBox/StatusBox'
import Background from '../../Components/Background/Background'
import InfoBox from '../../Components/InfoBox/InfoBox'
import * as helpers from 'App/Helpers/helpers'


const $ContainerDataInfo = styled.View`
position: absolute;
bottom: 10px;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`
/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu.',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu.',
})

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusText: props.statusText,
      infoText: props.infoText,
      amountContacts: props.amountContacts,
      isInfected: props.isInfected,
      daysAgo: props.daysAgo
    };
  }


  componentDidMount() {
    this._fetchUser()
  }

  render() {
    return (
      <View
        style={[
          Helpers.fill,
          Helpers.rowMain,
          Metrics.mediumHorizontalMargin,
          Metrics.mediumVerticalMargin,
        ]}
      >

        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={{position: 'relative', flex: 1 }}>
            <Background numContacts={this.state.amountContacts} isInfected={this.state.isInfected}/>
            <View style={Style.logoContainer}>
              <Image style={Helpers.fullSize} source={helpers.getStatusAttributes(this.state.amountContacts, this.state.isInfected).image} resizeMode={'contain'} />
            </View>
            <StatusBox {...this.state}/>
            <InfoBox {...this.state}/>
            {!this.state.isInfected ?
              <Buttons.Tips text='Tipps im Kampf gegen Corona'/>
              :
              <Buttons.Infected text={`Verwende diesen Qr-Code\n um dich testen zu lassen.`}/>
            }
            <$ContainerDataInfo>
              <Buttons.DataInfo text='Wie diese Daten berechnet werden' />
            </$ContainerDataInfo>
          </View>
        )}
      </View>

    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }
}

StartScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
  amountContacts: 150,
  isInfected: false,
  daysAgo: 5
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartScreen)
