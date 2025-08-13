import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';

export const fetchFeedback = createAsyncThunk(
  'adminFeedback/fetchFeedback',
  async () => {
    const response = await axios.get('/api/feedback'); 
    console.log("from the slice")
    console.log(response.data);
    return response.data;
  }
);

const feedbackSlice = createSlice({
  name: 'adminFeedback',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default feedbackSlice.reducer;
