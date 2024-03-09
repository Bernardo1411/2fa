/*
This file make the app responsive.
*/

import {Dimensions, Platform, PixelRatio} from 'react-native';

// get the windows dimensions, updates automatically and set the scale
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 13 Pro Max scale
const scaleX = SCREEN_WIDTH / 428;
const scaleY = SCREEN_HEIGHT / 926;

// returns the new size based on the scale of the width
function normalize(size: number): number {
  const newSize = size * scaleX;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

// returns the new size based on the scale of the height
export function normalizeHeight(size: number): number {
  const newSize = size * scaleY;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

export default normalize;
