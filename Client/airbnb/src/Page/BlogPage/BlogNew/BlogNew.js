import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export default function BlogNew({blog}) {
  const {t} = useTranslation();
  const sortedBlogs = blog?.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));

  // Get the four latest blogs
  const latestBlogs = sortedBlogs.slice(0, 4);

  return (
    <div className='shadow-md p-5 rounded-lg'>
    <h1 className='uppercase font-bold font-roboto text-primary  mb-5'>{t('newPost')}</h1>
    {latestBlogs?.map((item,i) => { 
        return <Link to={`/blog/${item.id}`} key={i}>
             <div className='flex items-center my-3'>
                 <img src={`${item.image}`} className='w-[40px] h-[40px] object-cover mb-2 mr-2 rounded-lg'/>
                 <h1 className='text-[11px] font-popping'>{item.title}</h1>
             </div>
              </Link>
     })}
    </div>
  )
}
