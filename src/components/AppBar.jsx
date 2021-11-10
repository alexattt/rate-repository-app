import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    backgroundColor: theme.colors.textPrimary,
  },
  text: {
    color: 'white'
  }
});

const onPressFunction = () => {
  return "Pressed";
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPressFunction}>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
    );
};

export default AppBar;