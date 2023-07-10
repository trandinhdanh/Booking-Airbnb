import React, { useEffect, useState } from 'react'
import { localStorageService } from '../../services/localStorageService';

export default function ProfilePage() {
  const [user, setuser] = useState(localStorageService.get('USER'));
useEffect(() => { 
    
 },[])
  return (
    <div>ProfilePage</div>
  )
}
