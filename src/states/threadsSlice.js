import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const asyncGetAllThreads = createAsyncThunk(
  'threads/getAll',
  async (_, { rejectWithValue }) => {
    const response = await api.getAllThreads();
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return response.data.threads;
  },
);

export const asyncGetThreadDetail = createAsyncThunk(
  'threads/getDetail',
  async (threadId, { rejectWithValue }) => {
    const response = await api.getThreadDetail(threadId);
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return response.data.detailThread;
  },
);

export const asyncCreateThread = createAsyncThunk(
  'threads/create',
  async ({ title, body, category }, { rejectWithValue }) => {
    const response = await api.createThread({ title, body, category });
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return response.data.thread;
  },
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    threads: [],
    threadDetail: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearThreadDetail(state) {
      state.threadDetail = null;
    },
    setThreadVote(state, action) {
      const { userId, voteType } = action.payload;
      if (state.threadDetail) {
        if (voteType === 1) {
          state.threadDetail.upVotesBy = [
            ...state.threadDetail.upVotesBy.filter((id) => id !== userId),
            userId,
          ];
          state.threadDetail.downVotesBy = state.threadDetail.downVotesBy.filter(
            (id) => id !== userId,
          );
        } else if (voteType === -1) {
          state.threadDetail.downVotesBy = [
            ...state.threadDetail.downVotesBy.filter((id) => id !== userId),
            userId,
          ];
          state.threadDetail.upVotesBy = state.threadDetail.upVotesBy.filter(
            (id) => id !== userId,
          );
        } else {
          state.threadDetail.upVotesBy = state.threadDetail.upVotesBy.filter(
            (id) => id !== userId,
          );
          state.threadDetail.downVotesBy = state.threadDetail.downVotesBy.filter(
            (id) => id !== userId,
          );
        }
      }
    },
    setCommentVote(state, action) {
      const { userId, commentId, voteType } = action.payload;
      if (state.threadDetail && state.threadDetail.comments) {
        const comment = state.threadDetail.comments.find(
          (c) => c.id === commentId,
        );
        if (comment) {
          if (voteType === 1) {
            comment.upVotesBy = [
              ...comment.upVotesBy.filter((id) => id !== userId),
              userId,
            ];
            comment.downVotesBy = comment.downVotesBy.filter(
              (id) => id !== userId,
            );
          } else if (voteType === -1) {
            comment.downVotesBy = [
              ...comment.downVotesBy.filter((id) => id !== userId),
              userId,
            ];
            comment.upVotesBy = comment.upVotesBy.filter(
              (id) => id !== userId,
            );
          } else {
            comment.upVotesBy = comment.upVotesBy.filter(
              (id) => id !== userId,
            );
            comment.downVotesBy = comment.downVotesBy.filter(
              (id) => id !== userId,
            );
          }
        }
      }
    },
    setThreadListVote(state, action) {
      const { threadId, userId, voteType } = action.payload;
      const thread = state.threads.find((t) => t.id === threadId);
      if (thread) {
        if (voteType === 1) {
          thread.upVotesBy = [
            ...thread.upVotesBy.filter((id) => id !== userId),
            userId,
          ];
          thread.downVotesBy = thread.downVotesBy.filter(
            (id) => id !== userId,
          );
        } else if (voteType === -1) {
          thread.downVotesBy = [
            ...thread.downVotesBy.filter((id) => id !== userId),
            userId,
          ];
          thread.upVotesBy = thread.upVotesBy.filter(
            (id) => id !== userId,
          );
        } else {
          thread.upVotesBy = thread.upVotesBy.filter(
            (id) => id !== userId,
          );
          thread.downVotesBy = thread.downVotesBy.filter(
            (id) => id !== userId,
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetAllThreads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetAllThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = action.payload;
      })
      .addCase(asyncGetAllThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncGetThreadDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetThreadDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.threadDetail = action.payload;
      })
      .addCase(asyncGetThreadDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncCreateThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncCreateThread.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(asyncCreateThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearThreadDetail, setThreadVote, setCommentVote, setThreadListVote } = threadsSlice.actions;
export default threadsSlice.reducer;
