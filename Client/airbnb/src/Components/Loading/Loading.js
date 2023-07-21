import React from 'react'
import './Loading.scss'
export default function Loading() {
  return (
    <div class="fixed z-50 w-full h-screen bg-[#0004] flex items-center justify-center">
    <div class="loader">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
  </div>
  )
}
