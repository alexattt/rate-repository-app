import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { useFonts } from 'expo-font';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import Text from './src/components/Text';

const App = () => {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular
  });

  if (!fontsLoaded) {
    return <Text>Loading app</Text>;
  }
  else {
    return (
      <>
        <NativeRouter>
          <Main />
        </NativeRouter>
        <StatusBar style="auto" />
      </>
    );
  }
};

export default App;