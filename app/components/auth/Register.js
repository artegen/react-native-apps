import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { withFormik } from 'formik';

import Form from './form';
import createFormOptions from './formOptions';

const signInForm = false;
const formOptions = createFormOptions(signInForm);
const signUpForm = props => <Form {...props} signIn={signInForm} />;
const EnhancedForm = withFormik(formOptions)(signUpForm);

export default graphql(
  // signup method is defined on the server
  gql`
    mutation SignUp($email: String!, $password: String!) {
      signup(email: $email, password: $password) {
        _id
        email
        jwt
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      signup: (email, password) => mutate({ variables: { email, password } }),
    }),
  }
)(EnhancedForm);
