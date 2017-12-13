import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { withFormik } from 'formik';

import Form from './form';
import { formOptionsLogin } from './formOptions';

const formOptions = formOptionsLogin();
const EnhancedForm = withFormik(formOptions)(Form);

export default graphql(
  gql`
    mutation LogIn($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        _id
        email
        jwt
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      login: (email, password) => mutate({ variables: { email, password } }),
    }),
  }
)(EnhancedForm);
