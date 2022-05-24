import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  fullName: '',
  username: '',
  followings: [],
  followers: [],
  avatarUrl: '',
  totalPosts: 0,
  saved: [],
};

const UserSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    initializeAccount(state, action) {
      const {
        userId,
        fullName,
        username,
        followers,
        followings,
        avatarUrl,
        totalPosts,
        saved,
      } = action.payload;

      console.log('redux', userId);

      state.userId = userId;
      state.fullName = fullName;
      state.username = username;
      state.followings = followings ?? [];
      state.followers = followers ?? [];
      state.saved = saved ?? [];
      state.avatarUrl = avatarUrl;
      state.totalPosts = totalPosts;
    },

    addNewFollower(state, action) {
      state.followers = state.followers.concat(action.payload.userId);
    },
    removeFollower(state, action) {
      state.followers = state.followers.filter(
        followerId => followerId !== action.payload.userId
      );
    },

    addToFollowings(state, action) {
      state.followings = state.followings.concat(action.payload);
    },

    createNewPost(state, action) {
      state.totalPosts++;
    },

    saveAPost(state, action) {
      state.saved.push(action.payload);
    },
    removeAPost(state, action) {
      state.saved = state.saved.filter(id => id !== action.payload);
    },
  },
});

const UserActions = UserSlice.actions;

export { UserActions, UserSlice };
