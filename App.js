import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import Navigator from './src/screens/Router';
import reducer from './src/reducers/index';
import colors from './src/config/styles';

export const store = createStore(reducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Navigator style={{backgroundColor: colors.yellow, flex: 1}} />
    </Provider>
  );
};

export default App;
