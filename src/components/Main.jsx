import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import { Route, Routes } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import { SingleRepoView } from './RepositoryItem';
import Review from './ReviewForm';
import SignUp from './SignUp';

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
        <Route exact path="/" element={<RepositoryList />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/createreview" element={<Review />} />
        <Route exact path="/repository/:id" element={<SingleRepoView />} />
      </Routes>
    </View>
  );
};

export default Main;