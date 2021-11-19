import { useMutation } from '@apollo/client';
import { useNavigate } from "react-router-native";
import { ADD_REVIEW } from '../graphql/mutations';

const usePostReview = () =>{
  const navigate = useNavigate();
  const [mutate, result] = useMutation(ADD_REVIEW);

  const reviewRepo = async ({ repositoryName, ownerName, text, rating }) => {
    const result = await mutate({ variables: { repositoryName, ownerName, text, rating } });

    if(result.data.createReview){
      navigate(`/repository/${result.data.createReview.repositoryId}`);
    }
    return result;
  };

  return [reviewRepo, result];
};

export default usePostReview;