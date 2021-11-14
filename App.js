import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { useFonts } from 'expo-font';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import Text from './src/components/Text';
import createApolloClient from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/context/AuthStorageContext';


const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

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
          <ApolloProvider client={apolloClient}>
            <AuthStorageContext.Provider value={authStorage}>
              <Main />
            </AuthStorageContext.Provider>
          </ApolloProvider>
        </NativeRouter>
        <StatusBar style="auto" />
      </>
    );
  }
};

export default App;