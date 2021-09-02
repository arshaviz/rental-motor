import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../reducers/index';
import Routes from '../routes/index';

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('state', serializedState);
  } catch (error) {
    // Ignore write errors.
  }
};
const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState(store.getState());
});

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>
);

export default App;
