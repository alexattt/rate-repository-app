import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

export const useSignUp = () => {

  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } });
    return result;
  };

  return [signUp, result];
};