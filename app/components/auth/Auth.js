import React, { Component } from 'react';
import { getToken } from '../../util';

class Auth extends Component {
  async componentWillMount() {
    this.token = await getToken();
  }

  render() {
    return <View>{this.token ? this.props.children : <Login />}</View>;
  }
}
