import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import { Route, Routes } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainContainer
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route exact path="/" element={<RepositoryList/>} />
        <Route exact path="/signin" element={<SignIn/>} />
      </Routes>
    </View>
  );
};

export default Main;