import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './auth-slice';
import { UserSlice } from './user-slice';
import { PostSlice } from './post-slice';
import { ToastSlice } from './toast-slice';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    user: UserSlice.reducer,
    post: PostSlice.reducer,
    toast: ToastSlice.reducer,
  },
});

export { store };

//store : collection of piece of states
//slice : piece of state
//slice : state, methods
