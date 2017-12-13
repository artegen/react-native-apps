import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import * as reducers from './store/reducers';
import * as actionCreators from './store/actions';

export default preLoadedState => {
  const rootReducer = combineReducers({ ...reducers });
  // const middlewares = applyMiddleware(middleware)
  const enhancers = composeEnhancers();
  const store = createStore(rootReducer, preLoadedState, enhancers);

  if (module.hot && __DEV__) {
    module.hot.accept('./reducers/index', () => {
      const reducers = require('./reducers/index');
      const rootReducer = combineReducers({ ...reducers });
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

const composeEnhancers = (...args) =>
  typeof window !== 'undefined'
    ? composeWithDevTools({ actionCreators })(...args)
    : compose(...args);
