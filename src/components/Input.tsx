import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {inputSizes} from '../styles/metrics';
import {colors} from '../styles/colors';
import {size} from '../styles/fonts';

interface InputProps {
  style?: object;
  error?: boolean;
  textContentType?: string;
  textAlign?: string;
  autoComplete?: string;
  onChange?: (text: string) => void;
  onSubmitEditing?: () => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  keyboardType?: string;
  value?: string;
  maxLength?: number;
  innerRef?: any;
  returnKeyType?: string;
}

const styles = StyleSheet.create({
  inputStyle: {
    width: inputSizes.width,
    height: inputSizes.height,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.greyC6C6C6,
    paddingHorizontal: 20,
    fontSize: size.font16,
    color: colors.black,
  },
  isFocused: {
    borderColor: colors.orange,
  },
  error: {
    borderColor: 'red',
  },
});

function Input({
  style,
  error,
  textContentType,
  textAlign,
  autoComplete,
  onChange,
  onSubmitEditing,
  secureTextEntry,
  placeholder,
  keyboardType,
  value,
  maxLength,
  innerRef,
  returnKeyType,
}: InputProps): React.JSX.Element {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <TextInput
      style={[
        styles.inputStyle,
        style,
        isFocus && style.isFocused,
        error && styles.error,
      ]}
      textContentType={textContentType}
      textAlign={textAlign}
      autoComplete={autoComplete}
      onChangeText={onChange}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderTextColor={colors.greyC6C6C6}
      keyboardType={keyboardType}
      value={value}
      maxLength={maxLength}
      ref={innerRef}
      onBlur={() => setIsFocus(false)}
      onFocus={() => setIsFocus(true)}
      multiline={false}
    />
  );
}

export default Input;
