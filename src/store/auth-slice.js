import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  token: '',
  fullName: '',
  username: '',
};

const AuthSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    loginHandler(state, action) {
      const { token, fullName, username } = action.payload;

      state = { isAuth: true, token, fullName, username };
    },

    logoutHandler(state, action) {
      state = { isAuth: false, token: '', fullName: '', username: '' };
    },
  },
});

const AuthActions = AuthSlice.actions;

export { AuthActions, AuthSlice };
