import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/customer/Home/Home";
import About from "@/components/customer/Home/About";
// import SearchResult from "@/components/customer/Home/SearchResult";
import CartPage from "@/pages/customer/Cart/CartPage";
import CheckoutPage from "@/pages/customer/Cart/CheckoutPage";
import Profile from "@/pages/customer/Profile/ProfilePage";
import NotFound from "@/pages/shared/NotFound";
import ListOfLounges from "@/pages/customer/Lounges/ListOfLounges";
import LoungeProfile from "@/pages/customer/Lounges/LoungeProfile";
import PrepaidRedirect from "@/pages/customer/Prepaid/PrepaidRedirect";
import PrepaidServiceRegistration from "@/pages/customer/Prepaid/PrepaidServiceRegistration";
import PrepaidServiceMemberPage from "@/pages/customer/Prepaid/PrepaidServiceMemberPage";
import PrepaidService from "@/pages/customer/Prepaid/PrepaidService";
import ChapaPaymentPage from "@/pages/shared/ChapaPaymentPageSimulation";
import ChapaSuccessPage from "@/pages/shared/ChapaSuccessPageSimulation";

const CustomerRoutes = () => (
  <Routes>
    <Route path="/homepage" element={<HomePage />} />
    <Route path="/customer/cart" element={<CartPage />} />
    <Route path="/customer/checkout" element={<CheckoutPage />} />
    <Route path="/customer/profile" element={<Profile />} />
    <Route path="/customer/lounges" element={<ListOfLounges />} />
    <Route path="/customer/lounge/:id" element={<LoungeProfile />} />
    <Route path="/customer/about" element={<About />} />
    {/* <Route path="/customer/search" element={<SearchResult />} /> */}
    <Route path="/customer/prepaid" element={<PrepaidRedirect />} />
    <Route
      path="/customer/Prepaid/register"
      element={<PrepaidServiceRegistration />}
    />
    <Route
      path="/customer/prepaid/member"
      element={<PrepaidServiceMemberPage />}
    />
    <Route path="/customer/prepaid/lounges" element={<PrepaidService />} />
    <Route path="/chapa/payment" element={<ChapaPaymentPage />} />
    <Route path="/chapa/success" element={<ChapaSuccessPage />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default CustomerRoutes;
