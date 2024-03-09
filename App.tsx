/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import BootSplash from 'react-native-bootsplash';

import Routes from './src/navigation/Routes';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar translucent backgroundColor="transparent" />
      <Routes />
    </SafeAreaView>
  );
}

export default App;
