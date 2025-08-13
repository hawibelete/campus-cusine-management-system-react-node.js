import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';

export const fetchLoungeById = createAsyncThunk(
  'loungeProfile/fetchLoungeById',
  async (loungeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/lounges/${loungeId}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const loungeProfileSlice = createSlice({
  name: 'loungeProfile',
  initialState: {
    lounge: null, 
    loading: false,
    error: null,
  },
  reducers: {
    clearLoungeProfile: (state) => {
      state.lounge = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoungeById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lounge = null; 
      })
      .addCase(fetchLoungeById.fulfilled, (state, action) => {
        state.loading = false;
        state.lounge = action.payload;
      })
      .addCase(fetchLoungeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
        state.lounge = null;
      });
  },
});

export const { clearLoungeProfile } = loungeProfileSlice.actions;
export default loungeProfileSlice.reducer;