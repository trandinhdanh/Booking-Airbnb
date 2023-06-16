import React, { useEffect, useState } from 'react'
import { roomService } from '../../services/RoomService'
import { useNavigate, useParams } from 'react-router-dom';
import SkeletonDetail from '../../Components/Skeleton/SkeletonDetail';
import { useTranslation } from 'react-i18next';
import './DetailRoomPage.scss';

export default function DetailRoomPage() {
    const {id} = useParams();
    const [roomDetail,setRoomDetail] = useState({})
    const [isFetch,setIsFecth] = useState(false) 
    const {t} = useTranslation()
    const navigate = useNavigate()
    useEffect(() => { 
        setIsFecth(true)
        roomService.getRoomById(id)
            .then((res) => {
                console.log(res);
                setRoomDetail(res.data)
                setIsFecth(false)
              })
              .catch((err) => {
                console.log(err);
                setIsFecth(false)
              });
     },[])
  return (
    <div className='container mx-auto pb-5 mb:pt-[0px] sm:pt-[0px] md:pt-[6rem]'>
        {isFetch ? <SkeletonDetail/> : 
        <>
          <div className="bg-white py-[12px] justify-between mb:flex sm:flex md:hidden">
              <button
                onClick={() => {
                  navigate('/');
                }}
                className="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                  />
                </svg>{' '}
                <span className="ml-2 font-[600] text-[1rem]">Home</span>
              </button>

              <div className="flex items-center">
                <div className="hover:underline cursor-pointer flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>
                  <p className="ml-1">{t('Share')}</p>{' '}
                </div>
                <div className="hover:underline cursor-pointer flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <p className="ml-1">{t('Save')}</p>{' '}
                </div>
              </div>
            </div>
           {roomDetail?.name}
        </>}
    </div>
  )
}
