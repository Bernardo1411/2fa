import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TwoFactorAuthScreen from '../screens/TwoFactorAuthScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

const Stack = createStackNavigator();

function Routes(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TwoFactorAuth"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="TwoFactorAuth" component={TwoFactorAuthScreen} />
        <Stack.Screen
          options={{
            title: '',
            headerShown: true,
            headerTransparent: true,
            headerTintColor: 'white',
          }}
          name="Confirmation"
          component={ConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
