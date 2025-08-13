import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';

export const fetchFeedback = createAsyncThunk(
  'loungeFeedback/fetchFeedback',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/feedback', { withCredentials: true });

      const mappedData = response.data.map(item => ({
        userId: item.user_id,
        id: item.id,
        customerName: item.customerName || 'Anonymous',
        email: item.email,
        rating: Number(item.rating),
        comment: item.comment,
        date: item.date,
        responded: item.responded || false,
      }));

      console.log("from the feedback slice")
      console.log(mappedData)
      return mappedData;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const feedbackSlice = createSlice({
  name: 'loungeFeedback',
  initialState: {
    feedback: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default feedbackSlice.reducer;
