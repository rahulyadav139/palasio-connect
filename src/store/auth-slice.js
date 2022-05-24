import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  token: '',
  fullName: '',
  username: '',
  userId: '',
};

const AuthSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    loginHandler(state, action) {
      const { username, token, fullName, userId } = action.payload;
      state.username = username;
      state.userId = userId;
      state.token = token;
      state.fullName = fullName;
      state.isAuth = true;
    },

    logoutHandler(state, action) {
      state = {
        isAuth: false,
        token: '',
        fullName: '',
        username: '',
        userId: '',
      };
    },
  },
});

const AuthActions = AuthSlice.actions;

export { AuthActions, AuthSlice };
