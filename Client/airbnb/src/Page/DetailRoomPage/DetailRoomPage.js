import React, { useEffect, useState } from 'react'
import { roomService } from '../../services/RoomService'
import { useNavigate, useParams } from 'react-router-dom';
import SkeletonDetail from '../../Components/Skeleton/SkeletonDetail';
import { useTranslation } from 'react-i18next';
// import TotalReserce from './TotalReserce'
import './DetailRoomPage.scss';
import OrderForm from './OrderForm/OrderForm';

export default function DetailRoomPage() {
    const {id} = useParams();
    const [roomDetail,setRoomDetail] = useState({})
    const [isFetch,setIsFecth] = useState(false) 
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [total, setTotal] = useState(0);
    useEffect(() => { 
        setIsFecth(true)
        roomService.getHouseById(id)
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
     const renderItemUtilities = () => {
      const roomDetails = [
        {
          key: "wifi",
          icon: "https://res.cloudinary.com/dvzingci9/image/upload/v1665892877/airBnB/icon%20offer%20detailpage/icon_ss0rmh.png",
          label: "Wifi",
        },
        {
          key: "pool",
          icon: "https://res.cloudinary.com/dvzingci9/image/upload/v1665892879/airBnB/icon%20offer%20detailpage/Frame-3_zslq3h.png",
          label: t('Pool'),
        },
        {
          key: "television",
          icon: "https://res.cloudinary.com/dvzingci9/image/upload/v1665892879/airBnB/icon%20offer%20detailpage/Frame_nsy3uv.png",
          label: "TV",
        },
        {
          key: "airConditioning",
          icon: "https://res.cloudinary.com/dvzingci9/image/upload/v1665892878/airBnB/icon%20offer%20detailpage/Frame-4_ropqpj.png",
          label: t('Air Conditioning'),
        },
        {
          key: "hotAndColdMachine",
          icon: "https://res.cloudinary.com/dvzingci9/image/upload/v1665892877/airBnB/icon%20offer%20detailpage/Frame-1_e5n14s.png",
          label: t('Hair Dryer'),
        },
        {
          key: "kitchen",
          icon: "https://res.cloudinary.com/dvzingci9/image/upload/v1665892878/airBnB/icon%20offer%20detailpage/Frame-5_vobdtz.png",
          label: t('Kitchen'),
        },
        {
          key: "parking",
          icon: "https://res.cloudinary.com/dvzingci9/image/upload/v1665892879/airBnB/icon%20offer%20detailpage/Frame_nsy3uv.png",
          label: t('Parking'),
        },
      ];
    
      return (
        <>
          <div className="w-full py-[2.2rem] border-b-[1px] border-[#dadada]">
            <h1 className="text-[1.625rem] font-[600]">{t('what this place offers')}</h1>
            <div className="grid grid-cols-2 w-3/4 gap-y-2 my-5 gap-x-16">
              {renderUtilities(roomDetails)}
            </div>
          </div>
        </>
      );
    };
    const renderUtilities = (details) => {
      return details.map((detail) => {
        if (roomDetail[detail.key]) {
          return (
            <p className="flex items-center font-[300] text-[1rem]" key={detail.key}>
              <img
                src={detail.icon}
                className="w-[1.1rem] h-[1.1rem] mr-[1rem]"
                alt=""
              />
              {detail.label}
            </p>
          );
        }
        return null;
      });
    };
  return (
    <div className='container mx-auto pb-5 mb:pt-[0px] sm:pt-[0px] md:pt-[6rem]'>
        {isFetch ? <SkeletonDetail/> : 
        <>
            <div className="image mb-2 mb:hidden sm:hidden md:block">
              <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[350px]">
              {roomDetail?.images && roomDetail.images.length > 0 ? (
                  <>
                    <img
                      className="rounded-[0.5rem] h-full w-full row-span-2 col-span-2 object-cover"
                      src={roomDetail.images[0]}
                      alt=""
                    />
                    <img
                      className="rounded-[0.5rem] h-full w-full object-cover"
                      src={roomDetail.images[1]}
                      alt=""
                    />
                    <img
                      className="rounded-[0.5rem] h-full w-full object-cover"
                      src={roomDetail.images[2]}
                      alt=""
                    />
                    <div className="overflow-hidden col-span-1">
                      <img
                        className="rounded-[0.5rem] h-full w-full object-cover col-span-1"
                        src={roomDetail.images[3]}
                        alt=""
                      />
                    </div>
                    <img
                      className="rounded-[0.5rem] h-full w-full object-cover"
                      src={roomDetail.images[0]}
                      alt=""
                    />
                  </>
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>
            <div className="w-full flex">
              <div className="mb:w-full sm:w-full md:w-3/5 lg:w-3/5">
                <div className="w-full mb:py-[1rem] sm:py-[1rem] md:py-[2.2rem] border-b-[1px] border-[#dadada]">
                  <h2 className="text-[1.375rem] font-[500]">Dome hosted Dorothy</h2>
                  <span className="text-[0.8rem] font-[400] text-[#717171]">
                    3 {t('Guest')} - 1 {t('Bedroom')} - 1 {t('Bed')} - {t('Bathroom')}
                  </span>
                </div>
                <div className=" py-[2.2rem] border-b-[1px] border-[#dadada]">
                  <div className="flex items-start mb-2">
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
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>

                    <div className="ml-2">
                      <h2 className="text-[1rem] font-[500]">{t('Dive right in')}</h2>
                      <p className="text-[0.8rem] font-[400] text-[#717171]">
                        {t('This is one of the few places in the area with a pool')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start ">
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
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>

                    <div className="ml-2">
                      <h2 className="text-[1rem] font-[500]">{t('Dive right in')}</h2>
                      <p className="text-[0.8rem] font-[400] text-[#717171]">
                        {t('This is one of the few places in the area with a pool')}
                      </p>
                    </div>
                  </div>
                </div>
                {/* ================================== AIRCOVER =================================== */}
                <div className="aircover py-[2.2rem] border-b-[1px] border-[#dadada]">
                  <h1 className="font-[700] text-[red] text-[32px]">
                    air<span className="font-[700] text-black text-[32px]">cover</span>
                  </h1>
                  <p className="text-[1rem] font-[300] my-[0.7rem] text-[#222222]">
                    {t(
                      'Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.'
                    )}
                  </p>
                  <span className="font-[700] underline text-[1rem]">{t('Learn more')}</span>
                </div>
                <div className="aircover py-[2.2rem] border-b-[1px] border-[#dadada]">
                  <p className="text-[1rem] font-[300] my-[0.7rem] text-[#222222]">
                    {roomDetail?.description}
                  </p>
                </div>
                {/* ================= Where you'll sleep ==================== */}
                <div className="w-full py-[2.2rem] border-b-[1px] border-[#dadada]">
                  <h1 className="text-[1.625rem] mb-[1.25rem] font-[600]">
                    {t("Where you'll sleep")}
                  </h1>
                  <div className="p-[1.2rem] text-left border rounded-[0.4rem] block">
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
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    <h2 className="font-[500] mt-3 mb-1 text-[1rem]">{t('Bedroom')}</h2>
                    <p className="font-[300] text-[0.8rem]">1 {t('Double Bed')}</p>
                  </div>
                </div>
                {/* ================= what this place offers ==================== */}
                {renderItemUtilities()}
              </div>
              <div className="pl-[6rem] mb:hidden sm:hidden md:block w-2/5">
                  <OrderForm room={roomDetail}/>
              </div>
            </div>
        </>}
    </div>
    
  )
}
