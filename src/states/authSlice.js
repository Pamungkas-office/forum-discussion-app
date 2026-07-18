import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const asyncRegister = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    const response = await api.register({ name, email, password });
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return response.data.user;
  },
);

export const asyncLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    const response = await api.login({ email, password });
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    api.setAccessToken(response.data.token);
    return response.data.token;
  },
);

export const asyncGetOwnProfile = createAsyncThunk(
  'auth/getOwnProfile',
  async (_, { rejectWithValue }) => {
    const response = await api.getOwnProfile();
    if (response.status !== 'success') {
      return rejectWithValue(response.message);
    }
    return response.data.user;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: api.getAccessToken() || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncRegister.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(asyncGetOwnProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetOwnProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(asyncGetOwnProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
