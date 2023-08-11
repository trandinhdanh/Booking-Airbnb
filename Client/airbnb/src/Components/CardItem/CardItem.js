import React, { useState } from 'react';
import './CardItem.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';

function CardItem({ roomInfor }) {
  const { t } = useTranslation();
  const [heartColor, setheartColor] = useState(false);

  const defaultImage = 'https://a0.muscache.com/im/pictures/237d7dae-4306-466c-aa4c-ae06b2853f94.jpg?im_w=720'
  const renderSwiperItem = () => {
    return roomInfor.images.length > 0
      ? roomInfor.images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="max-h-[270px] rounded-[0.8rem] object-cover h-full w-full"
          >
            <div className="flex items-center justify-center h-full w-full">
              <Image
                src={image}
                alt=""
                className="rounded-[0.8rem] object-cover h-full"
              />
            </div>
          </SwiperSlide>
        ))
      : (
        <SwiperSlide
          className="max-h-[270px] rounded-[0.8rem] object-cover h-full w-full"
        >
          <div className="flex items-center justify-center h-full w-full">
            <img
              src={defaultImage}
              alt=""
              className="rounded-[0.8rem] object-cover max-h-full"
            />
          </div>
        </SwiperSlide>
      );
  };
  
  return (
    <div className='relative text-black hover:text-black bg-white rounded-[2rem]'>
      <div className="h-[270px] ">
        <Swiper
          loop={true}
          cssMode={true}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper h-full"
        >
         {renderSwiperItem()}
        </Swiper>
      </div>

      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        className="absolute top-2 right-2 z-10"
        style={{
          display: 'block',
          fill: heartColor ? 'red' : 'rgba(0, 0, 0, 0.5)',
          height: 24,
          width: 24,
          stroke: 'rgb(255, 255, 255)',
          strokeWidth: 2,
          overflow: 'hidden',
        }}
      >
        <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" />
      </svg>
      <Link
      to={`/detail-room/${roomInfor.id}`}
      className=""
    >
      <div className="mt-[8px]">
        <div className="w-full flex justify-between">
          <h1 className="text-[1rem] font-[500]">{roomInfor.name.length >20 ? roomInfor.name.slice(0, 20) + "..." : roomInfor.name}</h1>
          <div className="flex justify-center items-center">
            {roomInfor?.totalStar >0 ?<>
            <FaStar size="0.8rem" className="mr-2" />
            <span className="text-[1rem] font-[300]">{roomInfor?.totalStar && roomInfor.totalStar.toFixed(1)}</span>
            </> : <span className="text-[0.8rem] font-[500] rounded bg-yellow-500 text-white px-1">{t('New Room')}</span>
          }
          </div>
        </div>
        <p className="text-[0.8rem] text-left font-[400] text-[black] opacity-60">
          {t('Max Guests')}: {roomInfor.maxGuests}
        </p>
        <p className="text-[0.8rem] text-left text-[black] opacity-60">{roomInfor.codeLocation}</p>
        <div className="flex items-center">
          <p className="text-[0.9rem] mr-2 font-[500] text-[black]">${roomInfor.price}</p>
          <span className="text-[0.8rem] font-[300] text-[black]">{t('/night')}</span>
        </div>
      </div>
    </Link>
    </div>
  );
}

export default CardItem;
