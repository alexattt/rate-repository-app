import { useQuery } from '@apollo/client';
import { SINGLE_REPO } from '../graphql/queries';

const useRepoReviews = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(SINGLE_REPO, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: SINGLE_REPO,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMore }) => {
        const nextResult = {
          repository: {
            ...fetchMore.repository,
            edges: [
              ...previousResult.repository.reviews.edges,
              ...fetchMore.repository.reviews.edges,
            ],
          },
        };
        return nextResult;
      },
    });
  };

  return {
    data,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepoReviews;