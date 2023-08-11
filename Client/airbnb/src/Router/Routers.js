import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Page/HomePage/HomePage";
import MainLayout from "../Layout/MainLayout";
import LoginPage from "../Page/LoginPage/LoginPage";
import RegisterPage from "../Page/RegisterPage/RegisterPage";
import NotFoundPage from "../Page/NotFoundPage/NotFoundPage";
import DetailRoomPage from "../Page/DetailRoomPage/DetailRoomPage";
import ManagerLayout from "../Layout/ManagerLayout";
import HouseManager from "../Page/Manager/HouseManager/HouseManager";
import AddHouseManager from "../Page/Manager/HouseManager/AddHouseManager/AddHouseManager";
import BookingCalendar from "../Page/Manager/BookingCalendar";
import OrderPage from "../Page/OrderPage/OrderPage";
import SearchPage from "../Page/SearchPage/SearchPage";
import OrderManager from "../Page/Manager/OrderManager";
import FeedbackManager from "../Page/Manager/FeedbackManager";
import UpdateHouseManager from "../Page/Manager/HouseManager/UpdateHouseManager/UpdateHouseManager";
import ProfilePage from "../Page/ProfilePage/ProfilePage";
import BlogManagerPage from "../Page/Manager/BlogManagerPage/BlogManagerPage";
import NewBlogManagerPage from "../Page/Manager/BlogManagerPage/NewBlogManagerPage/NewBlogManagerPage";
import UpdateBlogManagerPage from "../Page/Manager/BlogManagerPage/UpdateBlogManagerPage/UpdateBlogManagerPage";
import BlogPage from "../Page/BlogPage/BlogPage";
import BlogDetailPage from "../Page/BlogDetailPage/BlogDetailPage";
import ConfirmOrderPage from "../Page/ConfirmOrderPage/ConfirmOrderPage";
import RegisterOwner from "../Page/RegisterPage/RegisterOwner";
import StatisticalManager from "../Page/Manager/StatisticalManager";
import UserManagemer from "../Page/Manager/UserManager/UserManager";

export default function Routers() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/detail-room/:id" element={<DetailRoomPage />} />
            <Route path="/confirmOrder/:id" element={<ConfirmOrderPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
          </Route>
          <Route path="/manager" element={<ManagerLayout />}>
            <Route path="/manager/house" element={<HouseManager />} />
            <Route path="/manager/house-add" element={<AddHouseManager />} />
            <Route
              path="/manager/house-update/:id"
              element={<UpdateHouseManager />}
            />
            <Route path="/manager/calendar" element={<BookingCalendar />} />
            <Route path="/manager/user" element={<UserManagemer />} />
            <Route path="/manager/order" element={<OrderManager />} />
            <Route path="/manager/feedback" element={<FeedbackManager />} />
            <Route path="/manager/blog" element={<BlogManagerPage />} />
            <Route path="/manager/blog-add" element={<NewBlogManagerPage />} />
            <Route path="/manager/statistical" element={<StatisticalManager />} />
            <Route
              path="/manager/blog-update/:id"
              element={<UpdateBlogManagerPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
