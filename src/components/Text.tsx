import React from 'react';
import {Text as RNText, StyleSheet} from 'react-native';

import {size, family, weight} from '../styles/fonts';
import {colors} from '../styles/colors';

interface TextProps {
  style?: object;
  children: string;
}

const styles = StyleSheet.create({
  text: {
    fontSize: size.font16,
    fontWeight: weight.regular,
    fontFamily: family.regular,
    color: colors.greyF6F6F6,
    textAlign: 'center',
  },
});

const Text: React.FC<TextProps> = ({children, style}) => {
  return <RNText style={[styles.text, {...style}]}>{children}</RNText>;
};

export default Text;
