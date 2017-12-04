import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'; // 2.0.1
// import 'apollo-client';
// import 'graphql';

import { withFormik } from 'formik';
import Yup from 'yup';
import {
  Container,
  Button,
  Content,
  Form,
  Item,
  Input,
  Text,
} from 'native-base';

const RegisterForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ display: 'block' }}>
        Email
      </label>
      <input
        id="email"
        placeholder="Enter your email"
        type="text"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          errors.email && touched.email ? 'text-input error' : 'text-input'
        }
      />
      {errors.email &&
        touched.email && <div className="input-feedback">{errors.email}</div>}

      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>

      <DisplayFormikState {...props} />
    </form>
  );
};

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({ email: '' }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
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
)(Register);
