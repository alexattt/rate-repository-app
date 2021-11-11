import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Pressable } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  formView: {
    alignItems: 'center',
    paddingTop: '5%',
    backgroundColor: 'white'
  },
  signInBtn: {
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
    .required('Username is required!'),
  password: yup
    .string()
    .required('Password is required!'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formView}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput secureTextEntry={true} name="password" placeholder="Password" />
      <Pressable style={styles.signInBtn} onPress={onSubmit}>
        <Text style={{color: 'white', textAlign: 'center', fontWeight: '700'}}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={formValidationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;