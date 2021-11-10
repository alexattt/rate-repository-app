import React from 'react';
import { View } from 'react-native';
import { Text, Image } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white'
  },
  flexContainer: {
    flexDirection: 'row'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  mainInfo: {
    flexDirection: 'column',
    padding: 10,
    paddingLeft: 20,
    flexShrink: 1
  },
  statsInfo: {
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-evenly'
  },
  statsElement: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  mainTitle: {
    fontWeight: '700',
    fontSize: 16,
    paddingBottom: 5
  },
  description: {
    color: theme.colors.textSecondary
  },
  languageTag: {
    alignSelf: 'flex-start',
    marginTop: 5,
    padding: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 5
  }
});

const RepositoryItem = ({repoItem}) => {
  let starCount = repoItem["stargazersCount"];
  let forkCount = repoItem["forksCount"];
  let reviewCount = repoItem["reviewCount"];
  let ratingAverage = repoItem["ratingAverage"];

  if (starCount>=1000) {
    starCount = Math.round((repoItem["stargazersCount"]/1000)* 10) / 10 + "k";
  };

  if (forkCount>=1000) {
    forkCount = Math.round((repoItem["forksCount"]/1000)* 10) / 10 + "k";
  };

  if (reviewCount>=1000) {
    reviewCount = Math.round((repoItem["reviewCount"]/1000)* 10) / 10 + "k";
  };

  if (ratingAverage>=1000) {
    ratingAverage = Math.round((repoItem["ratingAverage"]/1000)* 10) / 10 + "k";
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.flexContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: repoItem["ownerAvatarUrl"],
          }}
        />
        <View style={styles.mainInfo}>
          <Text style={styles.mainTitle}>{repoItem["fullName"]}</Text>
          <Text style={styles.description}>{repoItem["description"]}</Text>
          <View style={styles.languageTag}>
            <Text style={{color: 'white'}}>{repoItem["language"]}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsInfo}>
        <View style={styles.statsElement}>
          <Text style={{fontWeight: '700', paddingBottom: 5}}>{starCount}</Text>
          <Text style={{color: theme.colors.textSecondary}}>Stars</Text>
        </View>
        <View style={styles.statsElement}>
          <Text style={{fontWeight: '700', paddingBottom: 5}}>{forkCount}</Text>
          <Text style={{color: theme.colors.textSecondary}}>Forks</Text>
        </View>
        <View style={styles.statsElement}>
          <Text style={{fontWeight: '700', paddingBottom: 5}}>{reviewCount}</Text>
          <Text style={{color: theme.colors.textSecondary}}>Reviews</Text>
        </View>
        <View style={styles.statsElement}>
          <Text style={{fontWeight: '700', paddingBottom: 5}}>{ratingAverage}</Text>
          <Text style={{color: theme.colors.textSecondary}}>Ratings</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;