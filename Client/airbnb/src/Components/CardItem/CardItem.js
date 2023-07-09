import React, { useRef, useState } from 'react';
import './CardItem.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { Link } from 'react-router-dom';
import { dataIMG } from '../../Data/Data';
import { useTranslation } from 'react-i18next';

function CardItem({ roomInfor }) {
  const { t } = useTranslation();
  const [heartColor, setheartColor] = useState(false);
  const handleHeartColor = () => {
    setheartColor(true);
  };
  const defaultImage = 'https://a0.muscache.com/im/pictures/237d7dae-4306-466c-aa4c-ae06b2853f94.jpg?im_w=720'
  const renderSwiperItem = () => {
    return roomInfor.images.length > 0
      ? roomInfor.images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="max-h-[260px] rounded-[0.8rem] object-cover h-full w-full"
          >
            <div className="flex items-center justify-center h-full w-full">
              <img
                src={image}
                alt=""
                className="rounded-[0.8rem] object-cover max-h-full"
              />
            </div>
          </SwiperSlide>
        ))
      : (
        <SwiperSlide
          className="max-h-[260px] rounded-[0.8rem] object-cover h-full w-full"
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
    <Link
      to={`/detail-room/${roomInfor.id}`}
      className="relative text-black hover:text-black bg-white rounded-[2rem]"
    >
      <div className="h-[270px]">
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
        onClick={handleHeartColor}
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

      <div className="mt-[8px]">
        <div className="w-full flex justify-between">
          <h1 className="text-[1rem] font-[500]">{roomInfor.name}</h1>
          <div className="flex justify-center items-center">
            <FaStar size="0.8rem" className="mr-2" />
            <span className="text-[1rem] font-[300]">5.0</span>
          </div>
        </div>
        <p className="text-[0.8rem] text-left font-[400] text-[black] opacity-60">
          9000km {t('kilometers away')}
        </p>
        <p className="text-[0.8rem] text-left text-[black] opacity-60">Oct 2-9</p>
        <div className="flex items-center">
          <p className="text-[0.9rem] mr-2 font-[500] text-[black]">${roomInfor.price}</p>
          <span className="text-[0.8rem] font-[300] text-[black]">{t('/night')}</span>
        </div>
      </div>
    </Link>
  );
}

export default CardItem;
