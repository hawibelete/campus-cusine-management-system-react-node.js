import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/users', { withCredentials: true });
      console.log('Fetched users:', response.data); 
      return response.data.map(user => ({
        id: user.user_id,
        firstName: user.f_name,
        lastName: user.l_name,
        email: user.email,
        username: user.username,
        dateAdded: user.added_at,
        imageUrl: user.image_url || `https://i.pravatar.cc/150?u=${user.username}`
      }));
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;
