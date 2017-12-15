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

// const EnhancedForm = () => (
//   <Formik
//     {...formOptions}
//     render={props => <Form {...props} signIn={false} />}
//   /> // overrides props, losing set values
// );

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
