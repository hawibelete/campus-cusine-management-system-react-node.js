import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/utility/axios';


export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/menus', { withCredentials: true });
      console.log('Fetched menu items:');
      console.log(response.data)
      const transformedResponse = response.data.map(item => ({
        menuItemId: item.menu_item_id,
        loungeId: item.lounge_id,
        name: item.name,
        price: item.price,
        description: item.description,
        availability: item.availability,
        addedAt: item.added_at,
        imageUrl: item.image_url,
      }));   
      console.log(transformedResponse)
      return transformedResponse;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addMenuItem = createAsyncThunk(
  'menu/addMenuItem',
  async (item, thunkAPI) => {
    try {
      const response = await axios.post('/api/menus', item, { withCredentials: true });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateMenuItem = createAsyncThunk(
  'menu/updateMenuItem',
  async (item, thunkAPI) => {
    try {
      console.log("Updating menu item:", item);
      const response = await axios.put(`${'/api/menus'}/${item.menuItemId}`, item, { withCredentials: true });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menu/deleteMenuItem',
  async (menuItemId, thunkAPI) => {
    try {
      await axios.delete(`${'/api/menus'}/${menuItemId}`, { withCredentials: true });
      return menuItemId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.menuItemId === action.payload.menuItemId);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.menuItemId !== action.payload);
      });
  }
});


export default menuSlice.reducer;
