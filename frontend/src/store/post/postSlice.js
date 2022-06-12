import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";
import { fetchUser } from "../user/userSlice";
import { getSingleHashtag, getFollowedHashtags } from "../hashtag/hashtagSlice";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, thunkAPI) => {
    try {
      return await postService.createPost(
        postData,
        thunkAPI.getState().user.token
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkAPI) => {
    try {
      return await postService.getPosts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (postId, thunkAPI) => {
    try {
      return await postService.getSinglePost(postId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const commentPost = createAsyncThunk(
  "post/commentPost",
  async (commentData, thunkAPI) => {
    try {
      let response = await postService.commentPost(
        commentData,
        thunkAPI.getState().user.token
      );

      response.comment = {
        ...response.comment,
        author: {
          name: thunkAPI.getState().user.userName,
          image: thunkAPI.getState().user.image,
          _id: thunkAPI.getState().user.uid,
        },
      };

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const voteForPost = createAsyncThunk(
  "post/voteForPost",
  async (voteData, thunkAPI) => {
    try {
      return await postService.voteForPost(
        voteData,
        thunkAPI.getState().user.token
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getVotes = createAsyncThunk(
  "post/getVotes",
  async (postId, thunkAPI) => {
    try {
      return await postService.getVotes(postId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getComments = createAsyncThunk(
  "post/getComments",
  async (postId, thunkAPI) => {
    try {
      return await postService.getComments(postId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getHotPosts = createAsyncThunk(
  "post/getHotPosts",
  async (hotNumber, thunkAPI) => {
    try {
      return await postService.getHotPosts(hotNumber);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  posts: {
    posts: [],
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
  post: {
    post: null,
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
  createdComment: {
    comment: null,
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
  vote: {
    isLoading: false,
  },
  votes: {
    votes: null,
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
  comments: {
    isError: false,
    isLoading: false,
    errorMessages: {},
    isSuccess: false,
  },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetPost(state) {
      state.post = {
        post: null,
        isError: false,
        isLoading: false,
        errorMessages: {},
        isSuccess: false,
      };
    },
    resetComment(state) {
      state.createdComment = {
        comment: null,
        isError: false,
        isLoading: false,
        errorMessages: {},
        isSuccess: false,
      };
    },
    resetVotes(state) {
      state.votes = {
        votes: null,
        isError: false,
        isLoading: false,
        errorMessages: {},
        isSuccess: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.post.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.post.isLoading = false;
        state.posts.posts.unshift(action.payload.post);
        state.post.isSuccess = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.post.isLoading = false;
        state.post.isError = true;
        state.post.errorMessages = action.payload;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.posts.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts.isLoading = false;
        state.posts.posts = state.posts.posts.concat(action.payload.posts);
        state.posts.isSuccess = true;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.posts.isLoading = false;
        state.posts.isError = true;
        state.posts.errorMessages = action.payload;
      })
      .addCase(getSinglePost.pending, (state) => {
        state.posts.isLoading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.posts.isLoading = false;
        state.posts.posts.push(action.payload.post);
        state.posts.isSuccess = true;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.posts.isLoading = false;
        state.posts.isError = true;
        state.posts.errorMessages = action.payload;
      })

      .addCase(commentPost.pending, (state) => {
        state.createdComment.isLoading = true;
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.createdComment.isLoading = false;
        const postIndex = state.posts.posts.indexOf(
          state.posts.posts.find((post) => post._id === action.payload.postId)
        );
        state.posts.posts[postIndex].comments.push(action.payload.comment);
        state.posts.posts[postIndex].commentCounter++;
        state.createdComment.isSuccess = true;
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.createdComment.isLoading = false;
        state.createdComment.isError = true;
        state.createdComment.errorMessages = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.posts.posts = action.payload.user.posts;
      })
      .addCase(getSingleHashtag.fulfilled, (state, action) => {
        state.posts.posts = action.payload.hashtag.posts;
      })
      .addCase(getFollowedHashtags.fulfilled, (state, action) => {
        state.posts.posts = action.payload.posts;
      })
      .addCase(voteForPost.pending, (state) => {
        state.vote.isLoading = true;
      })
      .addCase(voteForPost.fulfilled, (state, action) => {
        state.vote.isLoading = false;
        const { action: voteAction, userId, postId } = action.payload.vote;
        const post = state.posts.posts.find((post) => post._id === postId);
        const postIndex = state.posts.posts.indexOf(post);

        switch (voteAction) {
          case "upvote":
            if (
              post.votes.downvotes !== [] &&
              post.votes.downvotes.find((uid) => uid === userId)
            ) {
              state.posts.posts[postIndex].votes.downvotes = state.posts.posts[
                postIndex
              ].votes.downvotes.filter((id) => id !== userId);
              state.posts.posts[postIndex].votes.upvotes.push(userId);
            } else if (
              post.votes.upvotes !== [] &&
              post.votes.upvotes.find((uid) => uid === userId)
            ) {
              state.posts.posts[postIndex].votes.upvotes = state.posts.posts[
                postIndex
              ].votes.upvotes.filter((id) => id !== userId);
            } else {
              state.posts.posts[postIndex].votes.upvotes.push(userId);
            }
            break;
          case "downvote":
            if (
              post.votes.upvotes !== [] &&
              post.votes.upvotes.find((uid) => uid === userId)
            ) {
              state.posts.posts[postIndex].votes.upvotes = state.posts.posts[
                postIndex
              ].votes.upvotes.filter((id) => id !== userId);
              state.posts.posts[postIndex].votes.downvotes.push(userId);
            } else if (
              post.votes.downvotes !== [] &&
              post.votes.downvotes.find((uid) => uid === userId)
            ) {
              state.posts.posts[postIndex].votes.downvotes = state.posts.posts[
                postIndex
              ].votes.downvotes.filter((id) => id !== userId);
            } else {
              state.posts.posts[postIndex].votes.downvotes.push(userId);
            }
            break;
        }
      })
      .addCase(voteForPost.rejected, (state, action) => {
        state.vote.isLoading = false;
      })
      .addCase(getVotes.pending, (state) => {
        state.votes.isLoading = true;
      })
      .addCase(getVotes.fulfilled, (state, action) => {
        state.votes.isLoading = false;
        state.votes.isSuccess = true;
        state.votes.votes = action.payload.votes;
      })
      .addCase(getVotes.rejected, (state, action) => {
        state.votes.isLoading = false;
        state.votes.isError = true;
      })
      .addCase(getComments.pending, (state) => {
        state.comments.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments.isLoading = false;
        state.comments.isSuccess = true;
        const postIndex = state.posts.posts.indexOf(
          state.posts.posts.find((post) => post._id === action.payload.postId)
        );
        state.posts.posts[postIndex].comments = action.payload.comments;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.comments.isLoading = false;
        state.comments.isError = true;
      })
      .addCase(getHotPosts.pending, (state) => {
        state.posts.isLoading = true;
      })
      .addCase(getHotPosts.fulfilled, (state, action) => {
        state.posts.isLoading = false;
        state.posts.posts = state.posts.posts.concat(action.payload.posts);
        state.posts.isSuccess = true;
      })
      .addCase(getHotPosts.rejected, (state, action) => {
        state.posts.isLoading = false;
        state.posts.isError = true;
        state.posts.errorMessages = action.payload;
      });
  },
});

export const postActions = postSlice.actions;

export default postSlice;
