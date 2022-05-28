import { } from 'react-native';
import React from 'react';

import { store } from './redux/store'
import { Provider } from 'react-redux'
import Main from './navigators/main';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Main/>
      </Provider>
    </>
  );
}

