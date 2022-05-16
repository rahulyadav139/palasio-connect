import { createSlice } from '@reduxjs/toolkit';

export const ToastSlice = createSlice({
  name: 'toast',
  initialState: {
    status: false,
    message: '',
    type: '',
  },
  reducers: {
    setToast(state, action) {
      const { message, type } = action.payload;
      state.status = true;
      state.message = message;
      state.type = type;
    },
    resetToast(state) {
      state.status = false;
      state.message = '';
      state.type = '';
    },
  },
});

export const ToastActions = ToastSlice.actions;
