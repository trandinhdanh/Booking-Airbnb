import React, { useEffect } from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import HomePage from '../Page/HomePage/HomePage'
import MainLayout from '../Layout/MainLayout'
import LoginPage from '../Page/LoginPage/LoginPage'
import RegisterPage from '../Page/RegisterPage/RegisterPage'
import NotFoundPage from '../Page/NotFoundPage/NotFoundPage'
import DetailRoomPage from '../Page/DetailRoomPage/DetailRoomPage'
import ManagerLayout from '../Layout/ManagerLayout'
import HouseManager from '../Page/Manager/HouseManager/HouseManager'
import AddHouseManager from '../Page/Manager/HouseManager/AddHouseManager/AddHouseManager'
import BookingCalendar from '../Page/Manager/BookingCalendar'
import OrderPage from '../Page/OrderPage/OrderPage'
import Map from '../Page/Map'
import SearchPage from '../Page/SearchPage/SearchPage'

export default function Routers() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage/>} /> 
                <Route path='/register' element={<RegisterPage/>} /> 
                <Route path='/*' element={<NotFoundPage/>} /> 
                <Route path='/map' element={<Map/>} /> 
                <Route path='/' element = {<MainLayout/>}>
                    <Route path='/' element={<HomePage/>} /> 
                    <Route path='/order' element={<OrderPage/>} /> 
                    <Route path='/detail-room/:id' element={<DetailRoomPage/>} />
                    <Route path='/search' element={<SearchPage/>} />
                </Route>
                <Route path='/manager' element = {<ManagerLayout/>}>
                    <Route path='/manager/house' element={<HouseManager/>} />
                    <Route path='/manager/house-add' element={<AddHouseManager/>} />
                    <Route path='/manager/calendar' element={<BookingCalendar/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}