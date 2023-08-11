import React, { useEffect, useState, useTransition } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { AiOutlineArrowRight } from 'react-icons/ai'
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { blogService } from "../../services/blogService";
import SkeletonItem from "../../Components/Skeleton/SkeletonItem";
SwiperCore.use([Autoplay]);
export default function BlogBanner() {
  const { t } = useTranslation()
  const [blog, setBlog] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true)
        const response = await blogService.getAllBlog()
        setBlog(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      } finally {
      }
    }
    fetchBlog()
  }, [])
  return (
    <div className="fromBlog h-full  ">
      <Link to={'/blog'}><p className="font-sans text-primary flex items-center">{t('More Than')} <AiOutlineArrowRight className="ml-2" /></p></Link>
      {isLoading ?
        <div className="container  m-auto  grid mb:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-6 ">
          <SkeletonItem />
        </div>
        : <div className="swiperSlider">
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
            pagination={{ clickable: true }}
            module={[Autoplay, Pagination]}
            breakpoints={{
              350: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              650: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {blog?.map((item, i) => {
              return (
                <>
                <SwiperSlide key={i} className="py-3">
                  <Link to={`/blog/${item.id}`}>
                    <div className="px-3 pb-24 pt-3  rounded-lg shadow-md hover:shadow-lg transition-all w-[300px] h-[350px]">
                      <img className="rounded-lg w-full object-cover" src={item.image} />
                      <h1 className="text-center text-[15px] mt-[10px] font-bold ">{item.title}</h1>
                      <p className="text-center text-[12px] text-gray-500">{item.shortDescription}</p>
                    </div>
                  </Link>
                </SwiperSlide>
                </>
              )
            })}
          </Swiper>
        </div>}
    </div>
  );
}
