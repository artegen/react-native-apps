import React from 'react';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

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

// on Android, the URI prefix typically contains a host in addition to scheme
// const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

export default () => (
  <Router
    createReducer={reducerCreate}
    getSceneStyle={getSceneStyle}
    // uriPrefix={prefix}
  >
    <Stack back backTitle="Back" key="register" duration={0}>
      <Scene key="_register" component={Register} title="Register" />
      <Scene
        key="home"
        component={Home}
        title="Replace"
        type={ActionConst.REPLACE}
      />
    </Stack>
  </Router>
);
