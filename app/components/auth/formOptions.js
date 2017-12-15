import { signIn } from './util';
import yup from 'yup';
import { Actions } from 'react-native-router-flux';

const createFormOptions = (signInForm = true) => {
  const handleSubmit = signInForm
    ? chooseSubmitMethod('login')
    : chooseSubmitMethod('signup');
  return {
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
          message:
            'The password must contain low/uppercase letters and numbers',
          test: ({ password }) =>
            !/\w+/.test(password) ||
            !/[A-Z]/.test(password) ||
            !/\d/.test(password),
        }),
    }),
    handleSubmit,
    displayName: signInForm ? 'Login' : 'Register', // helps with React DevTools
  };
};

const chooseSubmitMethod = method => (
  { email, password },
  {
    props,
    setSubmitting,
    setErrors /* setValues, setStatus, and other goodies */,
  }
) => {
  props[method](email, password).then(
    ({ data }) => {
      setSubmitting(false);
      signIn(data[method].jwt);
      Actions.app();
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
};

export default createFormOptions;
