import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (searchKeyword, orderBy, orderDirection) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { searchKeyword, orderBy, orderDirection }
  });

  return { data, loading };
};

export default useRepositories;