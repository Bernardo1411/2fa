import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';

import {squareLogoSizes} from '../styles/metrics';
import normalize, {normalizeHeight} from '../utils/normalize';
import {size} from '../styles/fonts';
import {validatePhone} from '../utils/validate';

import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  squareLogo: {
    width: squareLogoSizes.width,
    height: squareLogoSizes.height,
    marginTop: normalizeHeight(100),
  },
});

interface TwoFactorAuthScreenProps {
  navigation: any;
}

function TwoFactorAuthScreen({
  navigation,
}: TwoFactorAuthScreenProps): React.JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    return setPhoneNumber('');
  }, []);

  const handleSendCode = async () => {
    if (validatePhone(phoneNumber)) {
      const apiKey = '2870e78e';
      const apiSecret = 'y0n53qiheAaONvm3';
      const brand = 'Transform Credit';

      try {
        const response = await axios.post('https://api.nexmo.com/verify/json', {
          api_key: apiKey,
          api_secret: apiSecret,
          number: phoneNumber.trim(),
          brand,
        });

        if (response.data.status === '0') {
          const requestId = response.data.request_id;

          setPhoneNumber('');
          navigation.navigate('Confirmation', {requestId});
        } else {
          ToastAndroid.showWithGravity(
            response.data.error_text,
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
          );
        }
      } catch (error: any) {
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        'Insert a valid phone number',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/backgroundImage.png')}
        style={styles.background}>
        <Image
          source={require('../../assets/images/squareLogo.png')}
          style={styles.squareLogo}
        />
        <Text
          style={{
            fontSize: size.font26,
            marginTop: normalizeHeight(100),
            width: normalize(300),
          }}>
          Please enter phone number below
        </Text>
        <Text
          style={{
            marginTop: normalizeHeight(50),
          }}>
          We will text a code to this number
        </Text>
        <Input
          style={{
            marginTop: normalizeHeight(10),
          }}
          textContentType="telephoneNumber"
          placeholder="Insert only numbers"
          keyboardType="number-pad"
          maxLength={20}
          value={phoneNumber}
          onChange={text => setPhoneNumber(text)}
          autoComplete="tel"
          textAlign="left"
          secureTextEntry={false}
          onSubmitEditing={handleSendCode}
          error={!validatePhone(phoneNumber) && phoneNumber.length > 0}
          innerRef={inputRef}
          returnKeyType="done"
        />
        <Button
          style={{
            marginTop: normalizeHeight(200),
          }}
          onPress={handleSendCode}>
          Send Code
        </Button>
      </ImageBackground>
    </View>
  );
}

export default TwoFactorAuthScreen;
