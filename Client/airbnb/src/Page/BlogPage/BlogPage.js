import React, { useEffect, useState } from 'react'
import BlogNew from './BlogNew/BlogNew';
import BlogList from './BlogList/BlogList';
import { blogService } from '../../services/blogService';

export default function BlogPage() {
  const [blog,setBlog] = useState([])
  useEffect(() => { 
    const fetchBlog = async () => { 
      try {
        const response = await blogService.getAllBlog()
        setBlog(response.data)
      } catch (error) {
        console.log(error)
      }
     }
     fetchBlog()
   },[])
  return (
    <div className='container mx-auto pt-28 pb-10 bg-white'>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 mb:grid-cols-3 gap-10 '>
          <div className='col-span-3 animate__fadeInLeft animate__animated'>
              <BlogList blog={blog}/>
          </div>
          <div className='col-span-1 lg:block md:hidden sm:hidden mb:hidden animate__fadeInRight animate__animated'>
              <BlogNew blog={blog}/>
          </div>
      </div>
    </div>
  )
}
