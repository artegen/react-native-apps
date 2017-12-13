import React from 'react';

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

// import { Provider } from 'react-redux';
// import configureStore from './storeConfig';

import Routes from './router';
import { getToken } from './components/auth/util';

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

// const store = configureStore();

export default () => (
  // <Provider store={store}>
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
  // </Provider>
);
