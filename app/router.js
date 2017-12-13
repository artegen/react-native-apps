import React from 'react';
import { Scene, Router, Reducer, Modal, Stack } from 'react-native-router-flux';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import App from './components/App';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3,
});

export default () => (
  <Router
    createReducer={reducerCreate}
    getSceneStyle={getSceneStyle}
    // uriPrefix={prefix}
  >
    <Stack
      key="root"
      hideNavBar
      transitionConfig={() => ({
        screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid,
      })}
      // titleStyle={{ alignSelf: 'center' }}
    >
      <Modal>
        <Stack key="app">
          <Scene key="app_main" component={App} initial />
        </Stack>

        <Stack key="auth">
          {/* Being second part wrapped in a modal this shows up in a modal view */}
          <Scene key="login" initial component={Login} title="Login" />
          <Scene key="register" component={Register} title="Register" />
        </Stack>

        {/* <Scene key="error" component={ErrorModal} /> */}
      </Modal>
    </Stack>
  </Router>
);
