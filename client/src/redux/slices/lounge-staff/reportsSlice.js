import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';

export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/reports/orders', { withCredentials: true });
      return response.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const fetchReportsByLounge = createAsyncThunk(
  'reports/fetchReportsByLounge',
  async (loungeId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/reports/orders`, { withCredentials: true });
      console.log('Response from fetchReportsByLounge: from the slice');
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log('Error fetching reports:');
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    report: {
      totalOrders: 0,
      totalSales: 0,
      averageOrderValue: 0,
      satisfactionScore: 0,
      topItems: [],
      dailySales: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    updateReport: (state, action) => {
      state.report = { ...state.report, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsByLounge.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportsByLounge.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchReportsByLounge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
  });

export const { updateReport } = reportsSlice.actions;
export default reportsSlice.reducer;
