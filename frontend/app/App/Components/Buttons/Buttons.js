import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components'
import ApplicationStyles from '../../Theme/ApplicationStyles'

const $Container = styled.View`
marginTop: 25px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const Tips = ({text}) => {
  return(
    <$Container>
      <TouchableOpacity style={styles.button}>
        <LinearGradient colors={['#A91A1A', '#680505', '#680505']} style={styles.gradient}>
          <Text style={styles.text}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </$Container>
  )
}

export const DataInfo = ({text}) => {
  return(
    <$Container>
      <TouchableOpacity style={styles.buttonHint}>
        <LinearGradient colors={['#F2F2F2', '#F2F2F2', '#F2F2F2']} style={styles.gradient}>
          <Text style={styles.textHint}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </$Container>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 5
  },
  button: {
    width: '100%',
    height: 45,
  },
  buttonHint: {
    borderRadius: 30,
    height: 43,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textHint: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'normal',
    padding: 15
  }
});
