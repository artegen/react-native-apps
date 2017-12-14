import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { Formik } from 'formik';

import Form from './form';
import { formOptionsRegister } from './formOptions';

const formOptions = formOptionsRegister();

const EnhancedForm = () => (
  <Formik
    {...formOptions}
    render={props => <Form {...props} signIn={false} />}
  />
);

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
