import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const asyncCreateComment = createAsyncThunk(
  'comments/create',
  async ({ threadId, content }, { rejectWithValue }) => {
    const response = await api.createComment({ threadId, content });
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return response.data.comment;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncCreateComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncCreateComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(asyncCreateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
