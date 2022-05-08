import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  fullName: '',
  username: '',
  followings: [],
  followers: [],
  avatarUrl: '',
};

const UserSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    initializeAccount(state, action) {
      const { userId, fullName, username, followers, followings, avatarUrl } =
        action.payload;

      state.userId = userId;
      state.fullName = fullName;
      state.username = username;
      state.followings = followings;
      state.followers = followers;
      state.avatarUrl = avatarUrl;
    },

    addNewFollower(state, action) {
      state.followers = state.followers.concat(action.payload.userId);
    },
    removeFollower(state, action) {
      state.followers = state.followers.filter(
        followerId => followerId !== action.payload.userId
      );
    },
  },
});

const UserActions = UserSlice.actions;

export { UserActions, UserSlice };
