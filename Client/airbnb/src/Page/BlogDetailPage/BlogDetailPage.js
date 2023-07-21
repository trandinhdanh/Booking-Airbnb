import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogNew from '../BlogPage/BlogNew/BlogNew';
import { blogService } from '../../services/blogService';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const getBlogById = async (id) => {
    try {
      const response = await blogService.getBlogById(id);
      setPost(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogById(id);
  }, [id]);

  return (
    <div className="container mx-auto lg:px-56 md:px-24 sm:px-24 mb:px-5 pt-24 pb-10 bg-white">
      <div className="">
        <div className="col-span-3 shadow-lg p-10 animate__fadeInLeft animate__animated">
          <h1 className="uppercase font-mono font-bold text-[20px] mb-5">{post?.title}</h1>
          <img className="h-[400px] w-full object-cover mb-5" src={post?.image} alt={post?.title} />
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </div>
      </div>
    </div>
  );
}
