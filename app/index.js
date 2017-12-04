/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import gql from 'graphql-tag';
import { ApolloProvider, graphql } from 'react-apollo';

import { Provider, connect } from 'react-redux';
import configureStore from './storeConfig';

import Routes from './router';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://q815p14lp.lp.gql.zone/graphql' }),
  cache: new InMemoryCache(),
});

const store = configureStore();

const App = () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

export default () => {
  const AppWithStore = connect(
    ({ loggedIn }) => ({
      loggedIn,
    })
    // null,
    // null,
    // { withRef: true }
  )(App);
  return (
    <Provider store={store}>
      <AppWithStore />
    </Provider>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
