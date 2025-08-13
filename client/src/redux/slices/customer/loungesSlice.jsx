import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '@/utility/axios';

export const fetchLounges = createAsyncThunk(
  "customerLounges/fetchLounges",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/lounges/with-rating", { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const loungeSlice = createSlice({
  name: "customerLounges",
  initialState: {
    lounges: [],
    selectedLounge: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedLounge: (state, action) => {
      state.selectedLounge = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLounges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLounges.fulfilled, (state, action) => {
        state.loading = false;
        state.lounges = action.payload;
      })
      .addCase(fetchLounges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedLounge } = loungeSlice.actions;
export default loungeSlice.reducer;
