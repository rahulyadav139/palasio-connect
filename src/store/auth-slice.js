import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: '',
  isAuth: false,
  authStatus: '',
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userLoginData, { rejectWithValue }) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/auth/login';
    const { data } = await axios.post(url, userLoginData);

    return data;
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async userData => {
    const url = process.env.REACT_APP_BACKEND_URL + '/auth/signup';

    const { data } = await axios.put(url, userData);

    return data;
  }
);

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state, action) {
      state.isAuth = false;
      state.token = '';

      document.cookie = `token='';expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      axios.defaults.headers.common['authorization'] = null;
    },
    loginHandler(state, action) {
      state.isAuth = true;
      state.token = action.payload;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.authStatus = 'pending';
    },
    [loginUser.rejected]: (state, action) => {
      state.authStatus = 'error';
    },
    [loginUser.fulfilled]: (state, action) => {
      const { token } = action.payload;
      state.isAuth = true;
      state.token = token;
      state.authStatus = 'success';
      document.cookie = `token=${token}`;
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    },
    [signupUser.pending]: (state, action) => {
      state.authStatus = 'pending';
    },
    [signupUser.rejected]: (state, action) => {
      state.authStatus = 'error';
    },

    [signupUser.fulfilled]: (state, action) => {
      const { token } = action.payload;

      state.token = token;
      state.isAuth = true;
      document.cookie = `token=${token}`;
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

      state.authStatus = 'success';
    },
  },
});

export const AuthActions = AuthSlice.actions;
