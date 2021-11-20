import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
    repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
      edges{
          node{
            id, name, fullName, ownerName, description, createdAt, forksCount, language, ownerAvatarUrl, ratingAverage, reviewCount, stargazersCount
          }
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
  query Repository($id: ID!){
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
      reviews {
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
        }
      }
    }
  }
`;