import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, Animated} from 'react-native';

import {colors} from '../styles/colors';
import {buttonSizes} from '../styles/metrics';
import {size, family, weight} from '../styles/fonts';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: buttonSizes.width,
    height: buttonSizes.height,
  },
  buttonText: {
    color: colors.greyF6F6F6,
    fontSize: size.font24,
    fontFamily: family.regular,
    fontWeight: weight.regular,
  },
});

interface ButtonProps {
  style?: object;
  children?: string;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({style, children, onPress}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [animation] = useState(new Animated.Value(1));

  useEffect(() => {
    if (isClicked) {
      Animated.timing(animation, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isClicked, animation]);

  const handleClick = () => {
    setIsClicked(true);

    onPress && onPress();
  };

  const animatedStyle = {
    transform: [{scale: animation}],
  };

  return (
    <TouchableOpacity
      style={[styles.button, style, animatedStyle]}
      onPress={handleClick}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
