import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import { USER_AUTH_STATUS } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';

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
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const { data, loading } = useQuery(USER_AUTH_STATUS, {
    fetchPolicy: 'cache-and-network',
  });

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link style={styles.linkElement} to="/">
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {data?.authorizedUser == null 
          ? 
          <Link style={styles.linkElement} to="/signin">
            <Text style={styles.text}>Sign In</Text>
          </Link>
          :
          <Text style={styles.linkElement} onPress={signOut}>
            <Text style={styles.text}>Sign Out</Text>
          </Text>
        }
      </ScrollView>
    </View>
    );
};

export default AppBar;