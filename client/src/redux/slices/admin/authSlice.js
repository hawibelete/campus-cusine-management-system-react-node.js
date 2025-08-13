import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: true, 
  user: {
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin"
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      return state;
    },
    logout: (state) => {
      return state;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
