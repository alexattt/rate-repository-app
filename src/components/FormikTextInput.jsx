import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    marginBottom: 5,
    color: theme.colors.errorColor
  },
  inputField: {
    width: '70%',
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 80,
    paddingRight: 80,
    marginBottom: 5,
    marginTop: 10
  },
  inputErrorField: {
    width: '70%',
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: theme.colors.errorColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 80,
    paddingRight: 80,
    marginBottom: 5,
    marginTop: 10
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        style={showError ? styles.inputErrorField : styles.inputField}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;