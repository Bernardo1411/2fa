import React, {useState, useRef} from 'react';
import {View, StyleSheet, Image, ToastAndroid} from 'react-native';
import axios from 'axios';

import {size, weight} from '../styles/fonts';
import normalize, {normalizeHeight} from '../utils/normalize';
import {validateCode} from '../utils/validate';

import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import {colors} from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.blue12203A,
  },
  logo: {
    marginTop: normalizeHeight(100),
    width: normalize(248),
    height: normalize(59),
  },
});

interface ConfirmationScreenProps {
  route: any;
}

function ConfirmationScreen({
  route,
}: ConfirmationScreenProps): React.JSX.Element {
  const [code, setCode] = useState('');

  const {params = {}} = route;

  const {requestId} = params;

  const inputRef = useRef(null);
  const handleCodeSubmit = async () => {
    if (validateCode(code)) {
      const apiKey = '2870e78e';
      const apiSecret = 'y0n53qiheAaONvm3';

      try {
        const response = await axios.post(
          'https://api.nexmo.com/verify/check/json',
          {
            api_key: apiKey,
            api_secret: apiSecret,
            request_id: requestId,
            code,
          },
        );

        if (response.data.status === '0') {
          setCode('');
          ToastAndroid.show('Success! Code is valid', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Code is invalid', ToastAndroid.SHORT);
        }
      } catch (error: any) {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Code is invalid', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: size.font32,
          fontWeight: weight.bold,
          marginTop: normalizeHeight(200),
          width: normalize(300),
        }}>
        Greate, we’ve found you!
      </Text>
      <Text
        style={{
          marginTop: normalizeHeight(50),
        }}>
        A code has been text to you. Please enter it below.
      </Text>
      <Input
        style={{
          marginTop: normalizeHeight(10),
        }}
        textContentType="none"
        placeholder="xxxx"
        keyboardType="number-pad"
        maxLength={4}
        value={code}
        onChange={text => setCode(text)}
        autoComplete="tel"
        textAlign="left"
        secureTextEntry={false}
        onSubmitEditing={handleCodeSubmit}
        error={!validateCode(code) && code.length > 0}
        innerRef={inputRef}
        returnKeyType="done"
      />
      <Button
        style={{
          marginTop: normalizeHeight(200),
        }}
        onPress={handleCodeSubmit}>
        Validate
      </Button>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
}

export default ConfirmationScreen;
