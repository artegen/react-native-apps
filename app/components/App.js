import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Text, Button, Content } from 'native-base';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { getToken, signOut } from './auth/util';
import { Actions } from 'react-native-router-flux';

class App extends Component {
  async componentWillMount() {
    const token = await getToken();
    token == null && Actions.login();
  }

  handleLogout = () => {
    signOut();
    Actions.login();
  };

  render() {
    const { currentUser } = this.props.data;

    return (
      <Container>
        <Content>
          {currentUser && (
            <View>
              <Text>{currentUser._id}</Text>
              <Text>{currentUser.email}</Text>
            </View>
          )}
          <Button full onPress={this.handleLogout}>
            <Text>Log Out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default graphql(
  gql`
    query User {
      currentUser {
        _id
        email
      }
    }
  `
)(App);
