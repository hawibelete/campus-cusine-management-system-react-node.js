import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '@/utility/axios';

export const fetchAllLounges = createAsyncThunk(
  "lounges/fetchAll",
  async (_, thunkAPI) => {
    try {
      console.log("Fetching lounges from the API...");
      const res = await axios.get("/api/lounges/", { withCredentials: true });
      console.log("Raw data from the API:", res.data);

      const transformedData = res.data.map(item => ({
        loungeId: item.lounge_id,
        name: item.name,
        location: item.location,
        description: item.description,
        addedAt: item.added_at,
        imageUrl: item.image_url,
        providesDelivery: item.provides_delivery,
        providesPrepaid: item.provides_prepaid,
        discountPercentage: item.discount_percentage,
        minimumTopUp: item.minimum_top_up,
        additionalInfo: item.additional_info,
        chapaPublicKey: item.chapa_public_key,
      }));

      console.log("Transformed lounge data:", transformedData);
      return transformedData;

    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch lounges"
      );
    }
  }
);


export const addLounge = createAsyncThunk(
  "lounges/add",
  async (loungeData, thunkAPI) => {
    try {
      console.log("loungeData: ", loungeData);
      const res = await axios.post("/api/lounges/", loungeData, { withCredentials: true });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add lounge");
    }
  }
);

export const updateLounge = createAsyncThunk(
  "lounges/update",
  async ({ loungeId, updatedData }, thunkAPI) => {
    try {
      console.log("Updating lounge with ID:", loungeId);
      console.log("Updated data:", updatedData);
      const res = await axios.put(`/api/lounges/${loungeId}`, updatedData, { withCredentials: true });
      console.log("Response from update:", res.data);
      return res.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update lounge");
    }
  }
);


export const deleteLounge = createAsyncThunk(
  "lounges/delete",
  async (loungeId, thunkAPI) => {
    try {
      await axios.delete(`/api/lounges/${loungeId}`, { withCredentials: true });
      return loungeId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete lounge");
    }
  }
);

const loungeSlice = createSlice({
  name: "lounges",
  initialState: {
    lounges: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLounges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLounges.fulfilled, (state, action) => {
        state.loading = false;
        state.lounges = action.payload;
      })
      .addCase(fetchAllLounges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addLounge.fulfilled, (state, action) => {
        state.lounges.push(action.payload);
      })

      .addCase(updateLounge.fulfilled, (state, action) => {
        const index = state.lounges.findIndex(l => l.lounge_id === action.payload.lounge_id);
        if (index !== -1) {
          state.lounges[index] = action.payload;
        }
      })      

      .addCase(deleteLounge.fulfilled, (state, action) => {
        state.lounges = state.lounges.filter(l => l.loungeId !== action.payload);
      });
  },
});

export default loungeSlice.reducer;
