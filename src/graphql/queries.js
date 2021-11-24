import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $after: String, $first: Int){
    repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection, after: $after, first: $first) {
      edges{
          node{
            id, name, fullName, ownerName, description, createdAt, forksCount, language, ownerAvatarUrl, ratingAverage, reviewCount, stargazersCount
          }
          cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const USER_AUTH_STATUS = gql`
  {
    authorizedUser {
      id
      username
    }
  }
`;

export const SINGLE_REPO = gql`
  query Repository($id: ID!, $after: String, $first: Int){
    repository(id: $id ) {
      id
      fullName
      ownerName
      description
      ownerAvatarUrl
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
      reviews(after: $after, first: $first) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;