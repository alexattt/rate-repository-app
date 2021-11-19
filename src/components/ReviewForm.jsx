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
import usePostReview from '../hooks/usePostReview';

const styles = StyleSheet.create({
  formView: {
    alignItems: 'center',
    paddingTop: '5%',
    backgroundColor: 'white'
  },
  addRepoBtn: {
    width: '70%',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5
  }
});

const formValidationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Repository name is required!'),
    ownerName: yup
    .string()
    .required('Owner name is required!'),
    rating: yup
    .number()
    .integer()
    .min(0)
    .max(100)
    .required('Rating is required!'),
    text: yup
    .string()
});

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};

export const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.formView}>
      <FormikTextInput name="ownerName" placeholder="Repo owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating 0-100" />
      <FormikTextInput name="text" placeholder="Review" />
      <Pressable style={styles.addRepoBtn} onPress={onSubmit}>
        <Text style={{color: 'white', textAlign: 'center', fontWeight: '700'}}>Add Review</Text>
      </Pressable>
    </View>
  );
};

export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={formValidationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const Review = () => {
  const [review] = usePostReview();
  
  const onSubmit = async (values) => {
    const repositoryName = values["repositoryName"]
    const ownerName = values["ownerName"]
    const text = values["text"]
    const rating = parseInt(values["rating"])
  
    try {
      const data = await review({repositoryName, ownerName, text, rating});
      console.log(data.data);
    }
    catch(err) {
      console.log(err);
    }
  };

  return (
    <ReviewFormContainer onSubmit={onSubmit} />
  );
};

export default Review;