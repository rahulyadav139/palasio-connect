import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  posts: [],
  post: {},
  status: '',
  postStatus: '',
};

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const url = process.env.REACT_APP_BACKEND_URL + '/post/all';

  const { data } = await axios.get(url);

  console.log(data);

  return data;
});

export const createNewPost = createAsyncThunk(
  'post/createNewPost',
  async newPostData => {
    const url = process.env.REACT_APP_BACKEND_URL + '/post/new-post';

    const { data } = await axios.post(url, newPostData);

    // getPosts();

    return data;
  }
);

export const likeAPost = createAsyncThunk(
  'post/likeAPost',
  async (postId, { getState }) => {
    const {
      user: { userId },
      post: { posts },
    } = getState();

    const url = process.env.REACT_APP_BACKEND_URL + '/post/like';

    await axios.post(url, { postId });

    const selectedPost = posts.find(post => post._id === postId);

    const updatedPosts = posts.map(post =>
      post._id === postId
        ? { ...selectedPost, likes: selectedPost.likes.concat(userId) }
        : post
    );

    return updatedPosts;
  }
);

export const removeLikeFromAPost = createAsyncThunk(
  'post/removeLikeFromAPost',
  async (postId, { getState }) => {
    const {
      user: { userId },
      post: { posts },
    } = getState();

    const url = process.env.REACT_APP_BACKEND_URL + '/post/remove-like';

    await axios.post(url, { postId });

    const selectedPost = posts.find(post => post._id === postId);

    const updatedPosts = posts.map(post =>
      post._id === postId
        ? {
            ...selectedPost,
            likes: selectedPost.likes.filter(id => id !== userId),
          }
        : post
    );

    return updatedPosts;
  }
);

export const deleteAPost = createAsyncThunk(
  'user/deleteAPost',
  async (postId, { getState }) => {
    const {
      post: { posts },
    } = getState();

    const url =
      process.env.REACT_APP_BACKEND_URL + '/post/delete-a-post/' + postId;

    await axios.delete(url);

    const updatedPosts = posts.filter(post => post._id !== postId);

    return updatedPosts;
  }
);

export const addAComment = createAsyncThunk(
  'post/addAComment',
  async commentData => {
    const url = process.env.REACT_APP_BACKEND_URL + '/post/add-comment';

    const { data } = await axios.post(url, commentData);

    return data;
  }
);

export const getAPost = createAsyncThunk(
  'post/getAPost',
  async (postId, { getState }) => {
    const url = process.env.REACT_APP_BACKEND_URL + '/post/' + postId;

    const { data } = await axios.get(url);

    return data;
  }
);

export const PostSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: {
    [getPosts.pending]: state => {
      state.postStatus = 'pending';
    },
    [getPosts.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.postStatus = 'logged-out';
      } else {
        state.postStatus = 'error';
      }
    },
    [getPosts.fulfilled]: (state, action) => {
      state.postStatus = 'success';
      state.posts = action.payload.posts;
    },
    [createNewPost.pending]: state => {
      state.postStatus = 'pending';
    },
    [createNewPost.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.postStatus = 'logged-out';
      } else {
        state.postStatus = 'error';
      }
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.postStatus = 'success';
      state.posts = action.payload.posts;
    },
    [likeAPost.pending]: state => {
      state.postStatus = 'pending';
    },
    [likeAPost.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.postStatus = 'logged-out';
      } else {
        state.postStatus = 'error';
      }
    },
    [likeAPost.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.postStatus = 'success';
    },
    [removeLikeFromAPost.pending]: (state, action) => {
      state.postStatus = 'pending';
    },
    [removeLikeFromAPost.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.postStatus = 'logged-out';
      } else {
        state.postStatus = 'error';
      }
    },

    [removeLikeFromAPost.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.postStatus = 'success';
    },
    [deleteAPost.pending]: (state, action) => {
      state.postStatus = 'pending';
    },
    [deleteAPost.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.postStatus = 'logged-out';
      } else {
        state.postStatus = 'error';
      }
    },

    [deleteAPost.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.postStatus = 'success';
    },
    [getAPost.pending]: (state, action) => {
      state.postStatus = 'pending';
    },
    [getAPost.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.postStatus = 'logged-out';
      } else {
        state.postStatus = 'error';
      }
    },

    [getAPost.fulfilled]: (state, action) => {
      state.post = action.payload;
      state.postStatus = 'success';
    },
    [addAComment.pending]: state => {
      state.postStatus = 'pending';
    },
    [addAComment.rejected]: (state, action) => {
      if (action.error.message.includes('401')) {
        state.postStatus = 'logged-out';
      } else {
        state.postStatus = 'error';
      }
    },

    [addAComment.fulfilled]: (state, action) => {
      state.postStatus = 'success';
    },
  },
});
