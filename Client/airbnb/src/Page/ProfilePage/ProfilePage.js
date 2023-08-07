import React, { useEffect, useState } from 'react'
import { localStorageService } from '../../services/localStorageService';

export default function ProfilePage() {
  const [user, setuser] = useState(localStorageService.get('USER'));
useEffect(() => { 
    
 },[])
  return (
    <div className='container mx-auto pt-28 pb-10 bg-white'>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 mb:grid-cols-3 gap-10 '>
          <div className='col-span-3 animate__fadeInLeft animate__animated'>
              dddddd
          </div>
          <div className='col-span-1 lg:block md:hidden sm:hidden mb:hidden animate__fadeInRight animate__animated'>
              dddddđ
          </div>
      </div>
    </div>
  )
}
