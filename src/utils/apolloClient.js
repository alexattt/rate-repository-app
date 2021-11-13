import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { GQL_URI } from '../../DATA';

const httpLink = createHttpLink({
  uri: GQL_URI,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;