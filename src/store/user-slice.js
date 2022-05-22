import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  userId: '',
  fullName: '',
  username: '',
  followings: [],
  followers: [],
  avatarUrl: '',
  savedPosts: [],
  suggestions: [],
  bio: '',
  website: '',
  email: '',
  notifications: [],
  userStatus: '',
};

export const getUser = createAsyncThunk('user/getUser', async () => {
  const url = process.env.REACT_APP_BACKEND_URL + '/user/get-data';
  const { data } = await axios.get(url);

  return data;
});

export const getSuggestions = createAsyncThunk(
  'user/getSuggestions',
  async () => {
    const url = process.env.REACT_APP_BACKEND_URL + '/user/get-suggestions';

    const { data } = await axios.get(url);

    return data;
  }
);

export const saveAPost = createAsyncThunk(
  'user/saveAPost',
  async (postId, { getState }) => {
    const {
      user: { savedPosts },
    } = getState();
    const url = process.env.REACT_APP_BACKEND_URL + '/user/save-a-post';
    await axios.post(url, { postId });

    const updatedSavedPosts = savedPosts.concat(postId);

    return updatedSavedPosts;
  }
);

export const removeASavedPost = createAsyncThunk(
  'user/removeASavedPost',
  async (postId, { getState }) => {
    const {
      user: { savedPosts },
    } = getState();

    const url = process.env.REACT_APP_BACKEND_URL + '/user/remove-a-saved-post';

    await axios.post(url, { postId });

    const updatedSavedPosts = savedPosts.filter(id => id !== postId);

    return updatedSavedPosts;
  }
);

export const addToFollowings = createAsyncThunk(
  'user/addToFollowers',
  async (userId, { getState }) => {
    const {
      user: { followings },
    } = getState();

    const url = process.env.REACT_APP_BACKEND_URL + '/user/add-to-followings';

    await axios.post(url, { newToFollowings: userId });

    const updatedFollowings = followings.concat(userId);

    return updatedFollowings;
  }
);

export const removeFromFollowings = createAsyncThunk(
  'user/removeFromFollowings',
  async (userId, { getState }) => {
    const {
      user: { followings },
    } = getState();

    const url =
      process.env.REACT_APP_BACKEND_URL + '/user/remove-from-followings';

    await axios.post(url, { removeFromFollowings: userId });

    const updatedFollowings = followings.filter(id => id !== userId);

    return updatedFollowings;
  }
);

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async profile => {
    const url = process.env.REACT_APP_BACKEND_URL + '/user/edit-profile';

    await axios.post(url, profile);

    return profile;
  }
);

export const deleteUserAccount = createAsyncThunk(
  'user/deleteUserAccount',
  async () => {
    const url = process.env.REACT_APP_BACKEND_URL + '/user/delete-account';

    await axios.delete(url);
  }
);

export const addAvatarImage = createAsyncThunk(
  'user/addAvatarImage',
  async (imageData, { getState }) => {
    const {
      auth: { token },
    } = getState();

    const url = process.env.REACT_APP_BACKEND_URL + '/user/upload-avatar';

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
      },
      body: imageData,
    });

    const data = await res.json();

    return data;
  }
);

export const clearNotifications = createAsyncThunk(
  'user/clearNotifications',
  async () => {
    const url = process.env.REACT_APP_BACKEND_URL + '/user/clear-notifications';

    await axios.delete(url);
  }
);

export const changeUserPassword = createAsyncThunk(
  'user/changeUserPassword',
  async passwordData => {
    const url = process.env.REACT_APP_BACKEND_URL + '/user/change-password';
    const { data } = await axios.post(url, passwordData);

    console.log(data);
  }
);
export const UserSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.userStatus = 'pending';
    },
    [getUser.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },
    [getUser.fulfilled]: (state, action) => {
      const {
        _id: userId,
        fullName,
        username,
        followings,
        followers,
        avatarUrl,
        savedPosts,
        bio,
        website,
        email,
        notifications,
      } = action.payload;

      state.userId = userId;
      state.fullName = fullName;
      state.username = username;
      state.followings = followings;
      state.followers = followers;
      state.avatarUrl = avatarUrl;
      state.savedPosts = savedPosts;
      state.bio = bio;
      state.website = website;
      state.email = email;
      state.notifications = notifications;
      state.userStatus = 'success';
    },

    [getSuggestions.pending]: (state, action) => {
      state.userStatus = 'pending';
    },
    [getSuggestions.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },
    [getSuggestions.fulfilled]: (state, action) => {
      state.userStatus = 'success';
      state.suggestions = action.payload.suggestions;
    },
    [saveAPost.pending]: state => {
      state.userStatus = 'pending';
    },
    [saveAPost.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },
    [saveAPost.fulfilled]: (state, action) => {
      state.savedPosts = action.payload;
      state.userStatus = 'success';
    },
    [removeASavedPost.pending]: state => {
      state.userStatus = 'pending';
    },
    [removeASavedPost.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },
    [removeASavedPost.fulfilled]: (state, action) => {
      state.savedPosts = action.payload;
      state.userStatus = 'success';
    },
    [addToFollowings.pending]: state => {
      state.userStatus = 'pending';
    },
    [addToFollowings.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },

    [addToFollowings.fulfilled]: (state, action) => {
      state.followings = action.payload;
      state.userStatus = 'success';
    },
    [removeFromFollowings.pending]: state => {
      state.userStatus = 'pending';
    },
    [removeFromFollowings.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },

    [removeFromFollowings.fulfilled]: (state, action) => {
      state.followings = action.payload;
      state.userStatus = 'success';
    },
    [editProfile.pending]: state => {
      state.userStatus = 'pending';
    },
    [editProfile.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },
    [editProfile.fulfilled]: (state, action) => {
      const { fullName, username, bio, website } = action.payload;

      state.username = username;
      state.fullName = fullName;
      state.bio = bio;
      state.website = website;
      state.userStatus = 'success';
    },
    [deleteUserAccount.pending]: state => {
      state.userStatus = 'pending';
    },
    [deleteUserAccount.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },
    [deleteUserAccount.fulfilled]: (state, action) => {
      state.userId = '';
      state.fullName = '';
      state.username = '';
      state.followings = [];
      state.followers = [];
      state.avatarUrl = '';
      state.savedPosts = [];
      state.bio = '';
      state.website = '';
      state.email = '';
      state.notifications = [];
      state.userStatus = 'success';
    },
    [addAvatarImage.pending]: state => {
      state.userStatus = 'pending';
    },
    [addAvatarImage.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },
    [addAvatarImage.fulfilled]: (state, action) => {
      const { avatarUrl } = action.payload;

      state.avatarUrl = avatarUrl;
      state.userStatus = 'success';
    },
    [clearNotifications.pending]: state => {
      state.userStatus = 'pending';
    },
    [clearNotifications.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },
    [clearNotifications.fulfilled]: (state, action) => {
      state.notifications = [];
      state.userStatus = 'success';
    },

    [changeUserPassword.pending]: state => {
      state.userStatus = 'pending';
    },
    [changeUserPassword.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.userStatus = 'logged-out';
      } else {
        state.userStatus = 'error';
      }
    },
    [changeUserPassword.fulfilled]: (state, action) => {
      state.userStatus = 'success';
    },
  },
});

export const UserActions = UserSlice.actions;
