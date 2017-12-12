import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { withFormik } from 'formik';
import yup from 'yup';

import RegisterForm from './registerForm';

const formOptions = {
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
};

const EnhancedForm = withFormik(formOptions)(RegisterForm);

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
