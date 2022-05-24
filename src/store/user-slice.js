import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  fullName: '',
  username: '',
  followings: [],
  followers: [],
  avatarUrl: '',
  totalPosts: 0,
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
      } = action.payload;

      state.userId = userId;
      state.fullName = fullName;
      state.username = username;
      state.followings = followings ?? [];
      state.followers = followers ?? [];
      state.avatarUrl = avatarUrl;
      totalPosts = totalPosts;
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
  },
});

const UserActions = UserSlice.actions;

export { UserActions, UserSlice };
