import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";

export const useSignIn = () => {
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } });

    if (result.data.authorize) {
      await authStorage.setAccessToken(result.data.authorize.accessToken);
      apolloClient.resetStore();
      navigate('/');
    }

    return result;
  };

  return [signIn, result];
};