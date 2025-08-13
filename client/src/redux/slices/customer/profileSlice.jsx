import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';

const initialState = {
  user: null,         // New: holds full user profile info
  favorites: [],
  isLoading: false,
  error: null,
};

// ✅ GET profile data from backend
export const fetchProfileAsync = createAsyncThunk(
  'profile/fetchProfileAsync',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users/profile', {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile data');
    }
  }
);

// ✅ POST like toggle
export const toggleLikeAsync = createAsyncThunk(
  'profile/toggleLikeAsync',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/api/users/profile/like',
        { itemId },
        { withCredentials: true }
      );
      return response.data.likedItems;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to toggle like');
    }
  }
);

// 🔧 Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchProfileAsync
      .addCase(fetchProfileAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.favorites = action.payload.favorites;
      })
      .addCase(fetchProfileAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // toggleLikeAsync
      .addCase(toggleLikeAsync.fulfilled, (state, action) => {
        state.likedItems = action.payload;
      })
      .addCase(toggleLikeAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
