import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: theme.colors.textPrimary,
  },
  linkElement: {
    paddingLeft: 20
  },
  text: {
    color: 'white',
    fontFamily: theme.fonts.main
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link style={styles.linkElement} to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        <Link style={styles.linkElement} to="/signin">
          <Text style={styles.text}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
    );
};

export default AppBar;