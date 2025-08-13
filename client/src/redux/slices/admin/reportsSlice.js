import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';

export const fetchReportsForAllLounges = createAsyncThunk(
  'adminReports/fetchReportsForAllLounges',
  async (loungeId, { rejectWithValue }) => {
    try {
      const url = loungeId === 'all'
        ? '/api/reports/aggregate'
        : `/api/reports/aggregate?loungeId=${loungeId}`;
      const response = await axios.get(url);
      console.log("Fetched report data:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch report'
      );
    }
  }
);

const initialState = {
  report: {
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    customerSatisfaction: 0,
    dailySales: [],
    monthlySales: [],
    categorySales: [],
    topSellingItems: [],
    revenueByLounge: [],
    demandByHour: [],
  },
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'adminReports',
  initialState,
  reducers: {
    resetReport: (state) => {
      state.report = initialState.report;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsForAllLounges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportsForAllLounges.fulfilled, (state, action) => {
        state.report = action.payload;
        state.loading = false;
      })
      .addCase(fetchReportsForAllLounges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unexpected error';
      });
  }
});

export const { resetReport } = reportSlice.actions;
export default reportSlice.reducer;
