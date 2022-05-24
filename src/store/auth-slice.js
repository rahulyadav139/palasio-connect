import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  token: '',
};

const AuthSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    loginHandler(state, action) {
      state.token = action.payload.token;

      state.isAuth = true;
    },

    logoutHandler(state, action) {
      state = {
        isAuth: false,
        token: '',
      };
    },
  },
});

const AuthActions = AuthSlice.actions;

export { AuthActions, AuthSlice };
