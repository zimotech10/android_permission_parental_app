// slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../components/axiosInstance';
import { Alert } from 'react-native';

// Define the initial state
const initialState = {
  user: {
    username: '',
    status: 201
  },
  status: 'idle',
  error: null,
};

// Define the login async thunk
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  const response = await axiosInstance.post('/api/auth', credentials);
  return response.data;
});
export const register = createAsyncThunk('auth/register', async (regInfo)=> {
  console.log(regInfo);
  const response = await axiosInstance.post('api/auth/register',regInfo);
  return response.status;
});
export const appsToServer = createAsyncThunk('auth/appsToServer', async (apps)=> {
  const response = await axiosInstance.post('api/apps',apps);
  return response.data;
});

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user.status = 0;
      state.user.playlist = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
