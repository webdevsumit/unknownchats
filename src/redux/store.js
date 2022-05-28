import { configureStore } from '@reduxjs/toolkit';
import stateReducer from './states';

export const store = configureStore({
  reducer: {
    state: stateReducer,
  },
});