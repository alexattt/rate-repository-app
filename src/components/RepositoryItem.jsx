import React from 'react';
import { ActivityIndicator, TouchableOpacity, Pressable, View, FlatList } from 'react-native';
import { Image } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import Text from './Text';
import theme from '../theme';
import { StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { SINGLE_REPO } from '../graphql/queries';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center"
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  separator: {
    height: 10
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
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginTop: 10,
    padding: 10
  },
  reviewItem: {
    flexDirection: 'row',
    paddingTop: 15
  },
  rating: {
    width: 35,
    height: 35,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 7
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepoContainer = ({repoItem}) => {
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
          <Text testID="fullName" style={styles.mainTitle}>{repoItem["fullName"]}</Text>
          <Text testID="description" style={styles.description}>{repoItem["description"]}</Text>
          <View style={styles.languageTag}>
            <Text testID="language" style={{color: 'white'}}>{repoItem["language"]}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsInfo}>
        <View style={styles.statsElement}>
          <Text testID="starCount" style={{fontWeight: '700', paddingBottom: 5}}>{starCount}</Text>
          <Text style={{color: theme.colors.textSecondary}}>Stars</Text>
        </View>
        <View style={styles.statsElement}>
          <Text testID="forkCount" style={{fontWeight: '700', paddingBottom: 5}}>{forkCount}</Text>
          <Text style={{color: theme.colors.textSecondary}}>Forks</Text>
        </View>
        <View style={styles.statsElement}>
          <Text testID="reviewCount" style={{fontWeight: '700', paddingBottom: 5}}>{reviewCount}</Text>
          <Text style={{color: theme.colors.textSecondary}}>Reviews</Text>
        </View>
        <View style={styles.statsElement}>
          <Text testID="ratingAvg" style={{fontWeight: '700', paddingBottom: 5}}>{ratingAverage}</Text>
          <Text style={{color: theme.colors.textSecondary}}>Ratings</Text>
        </View>
      </View>
    </View>
  )
}

const ReviewItem = ({ review }) => {
  var dateArr = review.createdAt.split('T');
  var pureDateArr = dateArr[0].split('-');
  var formatedDate = pureDateArr[2] + "/" + pureDateArr[1] + "/" + pureDateArr[0];

  return (
    <View style={styles.reviewItem}>
      <Text style={styles.rating}>{review.rating}</Text>
      <View style={{paddingLeft: 5 }}>
        <Text style={{fontWeight: 'bold', paddingBottom: 2 }}>{review.user.username}</Text>
        <Text style={{color: theme.colors.textSecondary, paddingBottom: 5 }}>{formatedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export const SingleRepoView = () => {
  const id = useParams().id;
  const { data, loading } = useQuery(SINGLE_REPO, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  if (loading) {
    return (
      <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
        <ActivityIndicator />
      </View>
    )
  }
  else {
    const repoItem = data.repository;
    const reviews = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

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

    const handleOpenWithLinking = () => {
      Linking.openURL(repoItem["url"]);
    }
  
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
            <Text testID="fullName" style={styles.mainTitle}>{repoItem["fullName"]}</Text>
            <Text testID="description" style={styles.description}>{repoItem["description"]}</Text>
            <View style={styles.languageTag}>
              <Text testID="language" style={{color: 'white'}}>{repoItem["language"]}</Text>
            </View>
          </View>
        </View>
        <View style={styles.statsInfo}>
          <View style={styles.statsElement}>
            <Text testID="starCount" style={{fontWeight: '700', paddingBottom: 5}}>{starCount}</Text>
            <Text style={{color: theme.colors.textSecondary}}>Stars</Text>
          </View>
          <View style={styles.statsElement}>
            <Text testID="forkCount" style={{fontWeight: '700', paddingBottom: 5}}>{forkCount}</Text>
            <Text style={{color: theme.colors.textSecondary}}>Forks</Text>
          </View>
          <View style={styles.statsElement}>
            <Text testID="reviewCount" style={{fontWeight: '700', paddingBottom: 5}}>{reviewCount}</Text>
            <Text style={{color: theme.colors.textSecondary}}>Reviews</Text>
          </View>
          <View style={styles.statsElement}>
            <Text testID="ratingAvg" style={{fontWeight: '700', paddingBottom: 5}}>{ratingAverage}</Text>
            <Text style={{color: theme.colors.textSecondary}}>Ratings</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleOpenWithLinking}>
          <Text style={{color: 'white'}}>Open in Github</Text>
        </TouchableOpacity>
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    )
  }
}

export const RepositoryItem = ({repoItem}) => {
  let starCount = repoItem["stargazersCount"];
  let forkCount = repoItem["forksCount"];
  let reviewCount = repoItem["reviewCount"];
  let ratingAverage = repoItem["ratingAverage"];
  const navigate = useNavigate();

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

  const onPressFunction = () => {
    navigate(`repository/${repoItem["id"]}`);
    //console.log(`I clicked on repo called ${repoItem["fullName"]}!`)
  }

  return (
    <Pressable onPress={onPressFunction}>
      <SingleRepoContainer repoItem={repoItem}/>
    </Pressable>
  );
};

export default RepositoryItem;