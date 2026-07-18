import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const asyncGetAllUsers = createAsyncThunk(
  'users/getAll',
  async (_, { rejectWithValue }) => {
    const response = await api.getUsers();
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return response.data.users;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(asyncGetAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
