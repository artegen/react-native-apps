import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'; // 2.0.1
// import 'apollo-client';
// import 'graphql';

import { withFormik } from 'formik';
import yup from 'yup';
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Label,
  Input,
  Text,
} from 'native-base';
import { StyleSheet } from 'react-native';

const RegisterForm = props => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    isSubmitting,
    handleBlur,
    handleSubmit,
  } = props;
  return (
    <Container>
      <Content>
        <Form>
          <Item
            floatingLabel
            error={!!errors.email || (touched.email && !!!values.email)}
          >
            <Label>Email</Label>
            <Input
              // placeholder="Email"
              value={values.email}
              onChangeText={value => setFieldValue('email', value)}
              onBlur={handleBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {!!errors.email &&
              touched.email && <Text style={s.error}>{errors.email}</Text>}
          </Item>
          <Item floatingLabel error={!!errors.password}>
            <Label>Password</Label>
            <Input
              // placeholder="Password"
              value={values.password}
              onChangeText={value => setFieldValue('password', value)}
              onBlur={handleBlur}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
            {!!errors.password &&
              touched.password && (
                <Text style={s.error}>{errors.password}</Text>
              )}
          </Item>
        </Form>
        <Button full onPress={handleSubmit} disabled={isSubmitting}>
          <Text>Sign Up</Text>
        </Button>
        <Button full transparent onPress={() => navigation.navigate('Login')}>
          <Text>Sign In</Text>
        </Button>
      </Content>
    </Container>
  );
};

const s = StyleSheet.create({
  error: {
    color: '#ff190c',
    fontSize: 12,
    marginTop: 6,
  },
});

const EnhancedForm = withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({ email: '', password: '' }),
  validationSchema: yup.object().shape({
    email: yup.string().email(
      //? checks required, trim, standard regex
      'To communicate we use your email, please ensure that it is correct'
    ),
    // .required('Email is required!'),
    // .matches(
    //   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    //   'There must be a mistake, please check once more'
    // ),
    password: yup
      .string()
      .test({
        name: 'min',
        message: 'The password must be at least 8 characters',
        // can be async
        test: ({ password }) => password == null || password.length < 8,
      })
      .test({
        name: 'alphanum',
        message: 'The password must contain low/uppercase letters and numbers',
        test: ({ password }) =>
          !/\w+/.test(password) ||
          !/[A-Z]/.test(password) ||
          !/\d/.test(password),
      }),
  }),
  handleSubmit: (
    { email, password },
    {
      props,
      setSubmitting,
      setErrors /* setValues, setStatus, and other goodies */,
    }
  ) => {
    props.signUp(email, password).then(
      ({ data }) => {
        setSubmitting(false);
        return props.screenProps.changeLoginState(true, data.signup.jwt);
      },
      error => {
        setSubmitting(false);
        // If the error message contains email or password we'll assume that's the error.
        if (/email/i.test(error.message)) {
          setErrors({ email: 'The email is not found' });
        }
        if (/password/i.test(error.message)) {
          setErrors({ password: 'The password is incorrect' });
        }
      }
    );
  },
  // displayName: 'BasicForm', // helps with React DevTools
})(RegisterForm);

export default graphql(
  gql`
    mutation SignUp($email: String!, $password: String!) {
      signUp(email: $email, password: $password) {
        _id
        email
        jwt
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      signUp: (email, password) => mutate({ variables: { email, password } }),
    }),
  }
)(EnhancedForm);
