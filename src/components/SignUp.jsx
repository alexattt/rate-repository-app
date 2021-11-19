import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Pressable } from 'react-native';
import Text from './Text';
import { useSignUp } from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';
import { useSignIn } from '../hooks/useSignIn';

const styles = StyleSheet.create({
  formView: {
    alignItems: 'center',
    paddingTop: '5%',
    backgroundColor: 'white'
  },
  signUpBtn: {
    width: '70%',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5
  }
});

const formValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(30)
    .required('Username is required!'),
  password: yup
    .string()
    .min(5, 'Password should be at least 5 characters long!')
    .max(50)
    .required('Password is required!'),
  repeatedPassword: yup
    .string()
    .min(5)
    .max(50)
    .oneOf([yup.ref('password'), null], 'Passwords must match!')
    .required('Password confirmation is required!'),
});

const initialValues = {
  username: '',
  password: '',
  repeatedPassword: ''
};

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <View style={styles.formView}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput secureTextEntry={true} name="password" placeholder="Password" />
        <FormikTextInput secureTextEntry={true} name="repeatedPassword" placeholder="Password confirmation" />
        <Pressable style={styles.signUpBtn} onPress={onSubmit}>
          <Text style={{color: 'white', textAlign: 'center', fontWeight: '700'}}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={formValidationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const username = values["username"]
    const password = values["password"]

    try {
      const data = await signUp({ username, password });
      if (data) {
        await signIn({username, password});
        console.log('Signed in!')
        navigate('/')
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit}/>
  );
};

export default SignUp;