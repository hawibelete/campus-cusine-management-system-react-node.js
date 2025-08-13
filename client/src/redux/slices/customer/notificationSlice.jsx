import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/notifications');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      await axios.patch(`/api/notifications/mark-read/${notificationId}`);
      return notificationId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllNotificationsAsRead',
  async (userId, { rejectWithValue }) => {
    try {
      await axios.patch(`/api/notifications/mark-all-read`);
      return userId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Could not fetch notifications';
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const id = action.payload;
        state.data = state.data.map((n) =>
          n.id === id ? { ...n, read: true } : n
        );
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.data = state.data.map((n) => ({ ...n, read: true }));
      });
  },
});

export default notificationSlice.reducer;
