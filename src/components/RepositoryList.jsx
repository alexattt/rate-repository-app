import React from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem';
import {Picker} from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center"
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {sortOrder, setSortOrder, searchValue, setSearchValue} = this.props;

    return (
      <View>
        <TextInput style={{height: 50, zIndex: 3, padding: 10, fontSize: 20}} placeholder="Search" value={searchValue} onChangeText={setSearchValue}></TextInput>
        <Picker
          style={{position: 'relative', height: 70, bottom: 70}}
          mode='dropdown'
          selectedValue={sortOrder}
          onValueChange={(itemValue) =>
            setSortOrder(itemValue)
          }>
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highestRated" />
          <Picker.Item label="Lowest rated repositories" value="lowestRated" />
        </Picker>
      </View>
    );
  };

  render() {
    const {repositories} = this.props;

    const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

    return (
      <View>
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({item}) => <RepositoryItem repoItem={item}/>}
          ListHeaderComponent={this.renderHeader}
        /> 
      </View>
    );
  }
}

const RepositoryList = () => {
  const [sortOrder, setSortOrder ] = useState('');
  const [searchValue, setSearchValue ] = useState('');
  const [searchKeyword] = useDebounce(searchValue, 500);

  var orderBy;
  var orderDirection;

  if (sortOrder == 'latest') {
    orderBy = 'CREATED_AT';
  }
  else if (sortOrder == 'highestRated') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'DESC'
  }
  else if (sortOrder == 'lowestRated') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'ASC'
  }
  else {
    orderBy = 'CREATED_AT';
    orderDirection = 'DESC';
  }

  const {data, loading} = useRepositories(searchKeyword, orderBy, orderDirection);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, styles.loadingHorizontal]}>
        <ActivityIndicator />
      </View>
    )
  }

  return <RepositoryListContainer repositories={data.repositories} sortOrder={sortOrder} setSortOrder={setSortOrder} searchValue={searchValue} setSearchValue={setSearchValue}/>;
};

export default RepositoryList;