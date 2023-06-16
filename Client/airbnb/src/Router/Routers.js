import React, { useEffect } from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import HomePage from '../Page/HomePage/HomePage'
import MainLayout from '../Layout/MainLayout'
import LoginPage from '../Page/LoginPage/LoginPage'
import RegisterPage from '../Page/RegisterPage/RegisterPage'
import NotFoundPage from '../Page/NotFoundPage/NotFoundPage'
import DetailRoomPage from '../Page/DetailRoomPage/DetailRoomPage'

export default function Routers() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage/>} /> 
                <Route path='/register' element={<RegisterPage/>} /> 
                <Route path='/' element = {<MainLayout/>}>
                    <Route path='/' element={<HomePage/>} />
                    <Route path='/detail-room/:id' element={<DetailRoomPage/>} />

                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}