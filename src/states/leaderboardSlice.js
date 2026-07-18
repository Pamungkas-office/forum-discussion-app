import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const asyncGetLeaderboards = createAsyncThunk(
  'leaderboard/getAll',
  async (_, { rejectWithValue }) => {
    const response = await api.getLeaderboards();
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return response.data.leaderboards;
  },
);

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    leaderboards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetLeaderboards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetLeaderboards.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboards = action.payload;
      })
      .addCase(asyncGetLeaderboards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default leaderboardSlice.reducer;
