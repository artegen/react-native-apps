// @flow
import { signIn } from './util';
import yup from 'yup';
import { Actions } from 'react-native-router-flux';

// @TODO: password error message disappears incorrectly, email verification is simplistic. Correct Yup.test()
const createFormOptions = (signInForm = true) => {
  const handleSubmit = signInForm
    ? chooseSubmitMethod('login')
    : chooseSubmitMethod('signup');
  return {
    // Transform outer props into form values
    mapPropsToValues: props => ({ email: '', password: '' }),
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email('Invalid email address')
        .required(
          'To communicate we use your email, please ensure that it is correct'
        ),
      // .matches(
      //   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      //   'There must be a mistake in your email, please check once more'
      // ),
      password: yup.string().test({
        name: 'min',
        message: 'The password must be at least 8 characters',
        // can be async
        test: password => password === '' || (password && password.length < 8),
      }),
      // .test({
      //   name: 'alphanum',
      //   message:
      //     'The password must contain low/uppercase letters and numbers',
      //   test: password =>
      //     !/\w+/.test(password) ||
      //     !/[A-Z]/.test(password) ||
      //     !/\d/.test(password),
      // }),
      // password: yup
      //   .string()
      //   .min(2, "C'mon, your name is longer than that")
      //   .required('First name is required.'),
    }),
    handleSubmit,
    displayName: signInForm ? 'Login' : 'Register', // helps with React DevTools
  };
};

const chooseSubmitMethod = (method: 'login' | 'signup') => (
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
      // re-write server error messages
      if (/email/i.test(error.message)) {
        method === 'login'
          ? setErrors({ email: 'The email is not found' })
          : setErrors({
              email:
                'This email is already in use. Did you forgot your password?',
            });
      }
      if (/password/i.test(error.message)) {
        setErrors({ password: 'The password is incorrect' });
      }
    }
  );
};

export default createFormOptions;
