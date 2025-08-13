import { configureStore } from '@reduxjs/toolkit';

// Lounge staff slices
import ordersReducer from './slices/lounge-staff/ordersSlice';
import menuReducer from './slices/lounge-staff/menuSlice';
import prepaidsReducer from './slices/lounge-staff/prepaidSlice';
import loungeFeedbackReducer from './slices/lounge-staff/feedbackSlice';
import reportsReducer from './slices/lounge-staff/reportsSlice';

// Admin slices
import authReducer from './slices/admin/authSlice';
import loungeReducer from './slices/admin/loungeSlice';
import userReducer from './slices/admin/userSlice';
import adminFeedbackReducer from './slices/admin/feedbackSlice';
import adminReportsReducer from './slices/admin/reportsSlice';

// Customer slices
import uiReducer from './slices/customer/uiSlice';
import cartReducer from './slices/customer/cartSlice';
import customerLoungeReducer from './slices/customer/loungesSlice';
import loungeProfileReducer from './slices/customer/loungeProfileSlice';
import notificationReducer from './slices/customer/notificationSlice';
import feedbackSlice from './slices/customer/feedbackSlice';
import profileReducer from './slices/customer/profileSlice';


const store = configureStore({
  reducer: {
    // Lounge
    orders: ordersReducer,
    menu: menuReducer,
    prepaids: prepaidsReducer,
    loungeFeedback: loungeFeedbackReducer,
    reports: reportsReducer,

    // Admin
    auth: authReducer,
    lounges: loungeReducer,
    users: userReducer,
    adminFeedback: adminFeedbackReducer,
    adminReports: adminReportsReducer,

    // Customer
    ui: uiReducer,
    cart: cartReducer,
    customerLounges: customerLoungeReducer,
    loungeProfile: loungeProfileReducer,
    notifications: notificationReducer,
    feedback: feedbackSlice,
    profile: profileReducer,

  },
});

export default store;
