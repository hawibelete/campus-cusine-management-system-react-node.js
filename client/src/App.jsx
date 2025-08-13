import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import Login from "@/pages/shared/Login.jsx";
import Register from "@/pages/shared/Register.jsx";
import ForgotPassword from "@/pages/shared/ForgotPassword.jsx";
import NotFound from "@/pages/shared/NotFound.jsx";

// Lounge Staff Components
// import Header from "@/components/lounge-staff/Header.jsx";
import LoungeDashboard from "@/pages/lounge-staff/Dashboard.jsx";
import ManageOrders from "@/pages/lounge-staff/ManageOrders.jsx";
import ManageMenu from "@/pages/lounge-staff/ManageMenu.jsx";
import ManagePrepaidService from "@/pages/lounge-staff/ManagePrepaidService.jsx";
import ViewFeedback from "@/pages/lounge-staff/ViewFeedback.jsx";
import ViewReport from "@/pages/lounge-staff/ViewReport.jsx";
import LoungeLayout from "@/components/lounge-staff/Layout";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import LoungeManagement from "@/pages/admin/LoungeManagement";
import UserManagement from "@/pages/admin/UserManagement";
import FeedbackManagement from "@/pages/admin/FeedbackManagement";
import ReportManagement from "@/pages/admin/ReportManagement";
import AdminLayout from "@/components/admin/Layout";

// Customer/Student Pages (from your first App.jsx)
import CustomerRoutes from "@/components/customer/Home/CustomerRoutes";
import CustomerLayout from "@/components/customer/Home/CustomerLayout";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/lounges" element={<LoungeManagement />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/feedback" element={<FeedbackManagement />} />
              <Route path="/admin/reports" element={<ReportManagement />} />
            </Route>
          </Route>

          {/* Lounge Staff Routes */}
          <Route element={<ProtectedRoute allowedRoles={["lounge_staff"]} />}>
            <Route element={<LoungeLayout />}>
            <Route path="/lounge-dashboard" element={<LoungeDashboard />} />
            <Route path="/lounge-staff/orders" element={<ManageOrders />} />
            <Route path="/lounge-staff/menu" element={<ManageMenu />} />
            <Route
              path="/lounge-staff/prepaids"
              element={<ManagePrepaidService />}
            />
            <Route path="/lounge-staff/feedback" element={<ViewFeedback />} />
            <Route path="/lounge-staff/reports" element={<ViewReport />} />
            </Route>
          </Route>

          {/* Student/Customer Routes */}
          <Route
            element={<ProtectedRoute allowedRoles={["student", "customer"]} />}
          >
            <Route
              path="/*"
              element={
                <CustomerLayout>
                  <CustomerRoutes />
                </CustomerLayout>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
