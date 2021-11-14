import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Pressable } from 'react-native';
import Text from './Text';
import { useSignIn } from '../hooks/useSignIn';

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

const SignInForm = ({ onSubmit, error }) => {
  return (
    <View>
      {error == ''
        ? 
        <View style={styles.formView}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput secureTextEntry={true} name="password" placeholder="Password" />
          <Pressable style={styles.signInBtn} onPress={onSubmit}>
            <Text style={{color: 'white', textAlign: 'center', fontWeight: '700'}}>Sign In</Text>
          </Pressable>
        </View>
        :
        <View style={styles.formView}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput secureTextEntry={true} name="password" placeholder="Password" />
          <Text style={{color: theme.colors.errorColor}}>Invalid username or password!</Text>
          <Pressable style={styles.signInBtn} onPress={onSubmit}>
            <Text style={{color: 'white', textAlign: 'center', fontWeight: '700'}}>Sign In</Text>
          </Pressable>
        </View>
      }
    </View>
  );
};

const SignIn = () => {
  const [signInError, setError] = useState('');
  const [signIn] = useSignIn();
  
  const onSubmit = async (values) => {
    const password = values["password"]
    const username = values["username"]
  
    try {
      const data = await signIn({username, password});
      console.log(data.data.authorize);
    }
    catch(err) {
      setError(err);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={formValidationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} error={signInError}/>}
    </Formik>
  );
};

export default SignIn;