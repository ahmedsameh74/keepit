import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

const loadState = () => {
  try {
    if (typeof window === 'undefined') return undefined;
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify({
      cart: state.cart,
      auth: state.auth,
    });
    localStorage.setItem('appState', serializedState);
  } catch (err) {
    // ignore write errors
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
