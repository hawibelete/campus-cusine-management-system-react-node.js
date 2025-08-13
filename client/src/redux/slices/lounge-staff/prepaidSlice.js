import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '@/utility/axios';

export const fetchPrepaids = createAsyncThunk(
  "prepaids/fetchPrepaids",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/prepaid_services");

      const { users = [], loungeInfo = [] } = response.data;

      console.log("Fetched prepaid users and lounge info:");
      console.log("users", users);
      console.log("loungeInfo", loungeInfo);

      const mappedUsers = users.map((item) => ({
        prepaidId: item.prepaid_id,
        userId: item.user_id,
        loungeId: item.lounge_id,
        prepaidAmount: item.prepaid_amount,
        remainingBalance: item.remaining_balance,
        addedAt: item.added_at,
      }));

      const mappedLoungeInfo = loungeInfo.map((item) => ({
        loungeId: item.lounge_id,
        discountPercentage: item.discount_percentage,
        minimumTopUp: item.minimum_top_up,
        additionalInfo: item.additional_info,
      }));

      return { users: mappedUsers, loungeInfo: mappedLoungeInfo };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch prepaids"
      );
    }
  }
);


export const updateLoungeInfo = createAsyncThunk(
  "prepaids/updateLoungeInfo",
  async ({ loungeId, data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `/api/prepaid_services/info/${loungeId}`, 
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update lounge info"
      );
    }
  }
);


const prepaidsSlice = createSlice({
  name: "prepaids",
  initialState: {
    users: [],
    loungeInfo: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPrepaids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrepaids.fulfilled, (state, action) => {
        state.loading = false;
        console.log(">>> fetchPrepaids fulfilled");
        state.users = action.payload.users || [];
        console.log("action.payload.users");
        console.log(action.payload.users);
        state.loungeInfo = action.payload.loungeInfo || [];
        console.log("action.payload.loungeInfo");
        console.log(action.payload.loungeInfo);
      })
      .addCase(fetchPrepaids.rejected, (state, action) => {
        state.loading = false;
        console.error(">>> fetchPrepaids rejected:", action.payload);
        state.error = action.payload;
      })

      .addCase(updateLoungeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLoungeInfo.fulfilled, (state, action) => {
        state.loading = false;
        const updated = {
          loungeId: action.payload.lounge_id,
          discountPercentage: action.payload.discount_percentage,
          minimumTopUp: action.payload.minimum_top_up,
          additionalInfo: action.payload.additional_info,
        };
      
        const index = state.loungeInfo.findIndex(
          (l) => l.loungeId === updated.loungeId
        );
      
        if (index !== -1) {
          state.loungeInfo[index] = updated;
        } else {
          state.loungeInfo.push(updated);
        }
        
      })
      
      .addCase(updateLoungeInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default prepaidsSlice.reducer;
