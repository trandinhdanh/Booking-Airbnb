import React, { useEffect, useState } from 'react'
import { roomService } from '../../services/RoomService'
import { useNavigate, useParams } from 'react-router-dom';
import SkeletonDetail from '../../Components/Skeleton/SkeletonDetail';
import { useTranslation } from 'react-i18next';
// import TotalReserce from './TotalReserce'
import './DetailRoomPage.scss';
import OrderForm from './OrderForm/OrderForm';
import Feedback from './Feedback/Feedback';
import { localStorageService } from '../../services/localStorageService';
import { favoriteService } from '../../services/favoriteService';
import { openNotificationIcon } from '../../Components/NotificationIcon/NotificationIcon';
import Map from '../SearchPage/Map';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function DetailRoomPage() {
  const { id } = useParams();
  const [roomDetail, setRoomDetail] = useState({})
  const [dataDate, setDataDate] = useState();
  const [isFetch, setIsFecth] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const containerStyle = {
    width: '100%',
    height: '500px'
  };
  const options = {
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ],
    // mapTypeControlOptions: {
    //   mapTypeIds: ['roadmap', 'hybrid'], // Chỉ hiển thị kiểu bản đồ roadmap và hybrid
    //   style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
    //   position: google.maps.ControlPosition.TOP_LEFT
    // },
  };
  const icon = {
    url: '/img/airbnb.png',
    scaledSize: {
      width: 45,
      height: 45
    },
  };
  useEffect(() => {
    setIsFecth(true)
    roomService.getHouseById(id)
      .then((res) => {
        setRoomDetail(res.data)
        console.log(res.data);
        setIsFecth(false)
      })
      .catch((err) => {
        console.log(err);
        setIsFecth(false)
      });
  }, [])
  useEffect(() => {
    roomService.getRoomCalendar(id).then((res) => {
      console.log(res);
      setDataDate(res.data)
    })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  const [user, setuser] = useState(localStorageService.get('USER')?.userDTO);

  const handlefavorite = async (idroom) => {
    try {
      if (user) {
        const formData = new FormData();
        formData.append("roomId", idroom);
        const response = await favoriteService.add(user.id, formData)
        openNotificationIcon("success", "Success", "Add Favority Success")
      } else {
        openNotificationIcon("error", "Error", "Please Login")

      }

    } catch (error) {
      openNotificationIcon("error", "Error", "Add Favority Error")
      console.log(error);
    }
  };
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
      {isFetch ? <SkeletonDetail /> :
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
                  <img
                    className="rounded-[0.5rem] h-full w-full object-cover "
                    src={roomDetail.images[3]}
                    alt=""
                  />
                  <img
                    className="rounded-[0.5rem] h-full w-full object-cover"
                    src={roomDetail.images[4]}
                    alt=""
                  />
                </>
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
          <div className="w-full flex h-full">
            <div className="mb:w-full sm:w-full md:w-3/5 lg:w-3/5">
              <div className="w-full mb:py-[1rem] sm:py-[1rem] md:py-[2.2rem] border-b-[1px] border-[#dadada]">
                <div className='flex justify-between'>
                  <h2 className="text-[1.5rem] font-[500]">{roomDetail?.name}</h2>
                  <button
                    className="px-4 py-1 rounded-lg bg-primary text-white font-medium hover:bg-[#068FFF] hover:text-white transition-all"
                    onClick={() => {
                      handlefavorite(id)
                    }}>SAVE</button>
                </div>
                <span className="text-[1rem] font-[400] text-[#717171]">
                  {roomDetail?.maxGuests} {t('Guest')} - {roomDetail?.numBedrooms} {t('Bed Room')} - {roomDetail?.numLivingRooms} {t('Living Room')} -  {roomDetail?.numBathrooms} {t('Bath Room')}
                </span>
                <p className="text-[1rem] font-[400] text-[#717171]">{roomDetail?.codeLocation}</p>
                <p className="text-[1rem] font-[400] text-[#717171]">{roomDetail?.address?.fullAddress}</p>
              </div>
              {/* ================================== AIRCOVER =================================== */}
              <div className="aircover py-[2.2rem] border-b-[1px] border-[#dadada]">
                <h1 className="font-[700] text-[red] text-[32px]">
                  air<span className="font-[700] text-black text-[32px]">cover</span>
                </h1>
                <p className="text-[1rem] font-[300] my-[0.7rem] text-[#222222]">
                  {roomDetail?.description}
                </p>
                <span className="font-[700] underline text-[1rem]">{t('Learn more')}</span>
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
                  <h2 className="font-[500] mt-3 mb-1 text-[1rem]">{roomDetail?.numBedrooms} {t('Bedroom')}</h2>
                </div>
              </div>
              {/* ================= what this place offers ==================== */}
              {renderItemUtilities()}
              {/* ================= FeedBack ============= */}
              <Feedback room={roomDetail} />
            </div>
            <div className="pl-[6rem] mb:hidden sm:hidden md:block w-2/5 h-[800px]">
              <OrderForm room={roomDetail} date={dataDate} />
            </div>
          </div>
        </>}
      <div className='container mx-auto pb-5 mb:pt-[0px] sm:pt-[0px] md:pt-[6rem]'>
        {/* <Map address={address} /> */}
        <LoadScript
          googleMapsApiKey="AIzaSyAuLeNevWVQJMYM7GBtmRa9yXNyP96Cnd8">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: roomDetail?.address?.lat, lng: roomDetail?.address?.lng
            }}
            zoom={13}
            options={options}
          >
            <Marker
              icon={icon}
              position={{ lat: roomDetail?.address?.lat, lng: roomDetail?.address?.lng }}
            />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>

  )
}
