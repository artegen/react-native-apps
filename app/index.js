import React from 'react';
import { StyleSheet } from 'react-native';

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

import { Provider, connect } from 'react-redux';
import configureStore from './storeConfig';

import Routes from './router';
import { signIn, signOut, getToken } from './util';
import Auth from './components/auth/Auth';

const httpLink = new HttpLink({ uri: 'https://q815p14lp.lp.gql.zone/graphql' });
const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();

  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : null,
  };
});
const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const store = configureStore();

export default () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Auth>
        <Routes />
      </Auth>
    </ApolloProvider>
  </Provider>
);
