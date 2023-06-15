import React, { useEffect } from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import HomePage from '../Page/HomePage/HomePage'
import MainLayout from '../Layout/MainLayout'
import LoginPage from '../Page/LoginPage/LoginPage'

export default function Routers() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/' element = {<MainLayout/>}>
                    <Route path='/' element={<HomePage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}