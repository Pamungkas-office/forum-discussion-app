import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const asyncUpVoteThread = createAsyncThunk(
  'votes/upVoteThread',
  async (threadId, { rejectWithValue }) => {
    const response = await api.upVoteThread(threadId);
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return { threadId, voteType: 1 };
  },
);

export const asyncDownVoteThread = createAsyncThunk(
  'votes/downVoteThread',
  async (threadId, { rejectWithValue }) => {
    const response = await api.downVoteThread(threadId);
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return { threadId, voteType: -1 };
  },
);

export const asyncNeutralizeVoteThread = createAsyncThunk(
  'votes/neutralizeVoteThread',
  async (threadId, { rejectWithValue }) => {
    const response = await api.neutralizeVoteThread(threadId);
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return { threadId, voteType: 0 };
  },
);

export const asyncUpVoteComment = createAsyncThunk(
  'votes/upVoteComment',
  async ({ threadId, commentId }, { rejectWithValue }) => {
    const response = await api.upVoteComment({ threadId, commentId });
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return { threadId, commentId, voteType: 1 };
  },
);

export const asyncDownVoteComment = createAsyncThunk(
  'votes/downVoteComment',
  async ({ threadId, commentId }, { rejectWithValue }) => {
    const response = await api.downVoteComment({ threadId, commentId });
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return { threadId, commentId, voteType: -1 };
  },
);

export const asyncNeutralizeVoteComment = createAsyncThunk(
  'votes/neutralizeVoteComment',
  async ({ threadId, commentId }, { rejectWithValue }) => {
    const response = await api.neutralizeVoteComment({ threadId, commentId });
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return { threadId, commentId, voteType: 0 };
  },
);

const votesSlice = createSlice({
  name: 'votes',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncUpVoteThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncUpVoteThread.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(asyncUpVoteThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncDownVoteThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncDownVoteThread.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(asyncDownVoteThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncNeutralizeVoteThread.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncNeutralizeVoteThread.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(asyncNeutralizeVoteThread.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncUpVoteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncUpVoteComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(asyncUpVoteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncDownVoteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncDownVoteComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(asyncDownVoteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncNeutralizeVoteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncNeutralizeVoteComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(asyncNeutralizeVoteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default votesSlice.reducer;
