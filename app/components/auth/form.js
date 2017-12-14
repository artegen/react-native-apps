import React from 'react';
import { Actions } from 'react-native-router-flux';

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
import { StyleSheet, TouchableHighlight } from 'react-native';

export default props => {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    isSubmitting,
    // handleBlur,
    handleSubmit,
    signIn = true,
  } = props;
  console.log({ props });

  return (
    <Container>
      <Content>
        <Form>
          <Item
            floatingLabel
            // error={!!errors.email || (touched.email && !!!values.email)}
          >
            <Label>Email</Label>
            <Input
              // placeholder="Email"
              value={values.email}
              onChangeText={value => setFieldValue('email', value)}
              // onBlur={handleBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* {!!errors.email &&
              touched.email && <Text style={s.error}>{errors.email}</Text>} */}
          </Item>
          {/* <Item floatingLabel error={!!errors.password}>
            <Label>Password</Label>
            <Input
              // placeholder="Password"
              value={values.password}
              onChangeText={value => setFieldValue('password', value)}
              // onBlur={handleBlur}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
            {!!errors.password &&
              touched.password && (
                <Text style={s.error}>{errors.password}</Text>
              )}
          </Item> */}
        </Form>

        <Button full onPress={handleSubmit} disabled={isSubmitting}>
          {signIn ? <Text>Sign In</Text> : <Text>Sign Up</Text>}
        </Button>
        <TouchableHighlight
          style={s.link}
          onPress={signIn ? Actions.register : Actions.login}
        >
          <Text style={s.linkText}>{signIn ? 'Sign Up' : 'Sign In'}</Text>
        </TouchableHighlight>
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
  link: {
    padding: 5,
  },
  linkText: {
    color: '#ff190c',
    letterSpacing: 1.3,
  },
});
