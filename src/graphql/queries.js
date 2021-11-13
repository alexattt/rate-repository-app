import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id, name, fullName, description, createdAt, forksCount, language, ownerAvatarUrl, ratingAverage, reviewCount, stargazersCount
        }
      }
    }
  }
`;