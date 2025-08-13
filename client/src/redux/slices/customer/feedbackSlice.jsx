import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';

const initialState = {
  feedbacks: [],
  currentFeedback: {
    rating: 0,
    comment: '',
    user_id: 1, // Placeholder (get from backend auth ideally)
    lounge_id: 1,
  },
  isSubmitting: false,
  error: null,
};

// ✅ Async action to send feedback to backend
export const submitFeedbackAsync = createAsyncThunk(
  'feedback/submitFeedbackAsync',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { currentFeedback } = getState().feedback;

      const payload = {
        rating: currentFeedback.rating,
        message: currentFeedback.comment,
        loungeId: currentFeedback.lounge_id,
      };
console.log("rating")
console.log(payload)
      const response = await axios.post('/api/feedback', payload, {
        withCredentials: true, // send cookies (JWT)
      });

      return response.data;
    } catch (err) {
      console.error("Feedback submit error:", err);
      return rejectWithValue(err.response?.data?.message || 'Submit failed');
    }
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.currentFeedback.rating = action.payload;
    },
    setComment: (state, action) => {
      state.currentFeedback.comment = action.payload;
    },
    resetForm: (state) => {
      state.currentFeedback = {
        rating: 0,
        comment: '',
        user_id: 1,
        lounge_id: 1,
      };
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedbackAsync.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitFeedbackAsync.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.feedbacks.push(action.payload); // Add to list
        state.currentFeedback = {
          rating: 0,
          comment: '',
          user_id: 1,
          lounge_id: 1,
        };
      })
      .addCase(submitFeedbackAsync.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      });
  }
});

export const { setRating, setComment, resetForm } = feedbackSlice.actions;
export default feedbackSlice.reducer;
