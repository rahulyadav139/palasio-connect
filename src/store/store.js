import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './auth-slice';
import { UserSlice } from './user-slice';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    user: UserSlice.reducer,
  },
});

export { store };
