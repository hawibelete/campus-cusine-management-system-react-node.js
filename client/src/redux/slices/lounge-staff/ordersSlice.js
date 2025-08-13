import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/orders', { withCredentials: true });

      const groupedOrders = {};

      response.data.forEach(item => {
        const orderId = item.order_id;

        if (!groupedOrders[orderId]) {
          groupedOrders[orderId] = {
            orderId: item.order_id,
            customerName: item.customer_name,
            totalPrice: item.total_price,
            status: item.status,
            orderDate: item.order_date,
            items: []
          };
        }

        groupedOrders[orderId].items.push({
          itemName: item.item_name,
          quantity: item.quantity,
          itemPrice: item.price
        });
      });

      return Object.values(groupedOrders);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const fetchOrderDetails = createAsyncThunk(
  'orders/fetchOrderDetails',
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/orders/${orderId}/details`, { withCredentials: true });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, thunkAPI) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, { status }, { withCredentials: true });
      return { orderId, status };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, status } = action.payload;
        const index = state.orders.findIndex(order => order.orderId === orderId); 
        if (index !== -1) {
          state.orders[index] = {
            ...state.orders[index],
            status
          };
        }
        
        if (state.selectedOrder?.id === orderId) { 
          state.selectedOrder = {
            ...state.selectedOrder,
            status
          };
        }
        
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update order status';
      });
  }
});

export default ordersSlice.reducer;
