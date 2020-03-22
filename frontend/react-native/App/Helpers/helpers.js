import { Images } from 'App/Theme'

export const getStatusAttributes = (num, isInfected) => {
  let attributes = {
    color: {
      right: null,
      left: null,
      bottom: null
    },
    image: null,
    infoText: null
  }

  if(!isInfected) {
    if (num < 10) {
      //Green
      attributes.color.right = '#128543'
      attributes.color.left = '#77B576'
      attributes.color.bottom = '#286C45'
      attributes.image = Images.greenBluto
      attributes.infoText = ''
    }

    else if (num < 50) {
      //Yellow
      attributes.color.right = '#FFBD80'
      attributes.color.left = '#FDD46B'
      attributes.color.bottom = '#F3BF39'
      attributes.image = Images.yellowBluto
      attributes.infoText = 'Versuche, deine Kontakte zu reduzieren. Das hilft dir und uns allen im Kampf gegen COVID-19.'

    }

    else if (num > 50) {
      //Orange
      attributes.color.right = '#EB915F'
      attributes.color.left = '#E27F5F'
      attributes.color.bottom = '#CE693D'
      attributes.image = Images.orangeBluto
      attributes.infoText = 'Du solltest deine Kontakte stark reduzieren! Das hilft dir und uns allen im Kampf gegen COVID-19.'

    }
  }
  else {
    attributes.color.right = '#C4082A'
    attributes.color.left = '#D05A5A'
    attributes.color.bottom = '#940707'
    attributes.image = Images.redBluto
  }

  return attributes

}

