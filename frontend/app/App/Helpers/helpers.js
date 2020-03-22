

export const getColors = (num, isInfected) => {
  let color = {
    right: null,
    left: null,
    buttom: null
  }
  if(!isInfected) {
    if (num < 10) {
      //Green
      color.right = '#128543'
      color.left = '#77B576'
      color.bottom = '#286C45'
    }

    else if (num < 50) {
      //Yellow
      color.right = '#FFBD80'
      color.left = '#FDD46B'
      color.bottom = '#F3BF39'

    }

    else if (num > 50) {
      //Orange
      color.right = '#EB915F'
      color.left = '#E27F5F'
      color.bottom = '#CE693D'

    }
  }
  else {
    color.right = '#C4082A'
    color.left = '#D05A5A'
    color.bottom = '#940707'
  }

  return color

}