import { message } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { openNotificationIcon } from '../../Components/NotificationIcon/NotificationIcon';
import { localStorageService } from '../../services/localStorageService';
import { useTranslation } from 'react-i18next';
import { roomService } from '../../services/RoomService';
import moment from 'moment';
import { orderService } from '../../services/orderService';

export default function ConfirmOrderPage() {
  const { id } = useParams();
  const location = useLocation()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [roomDetail, setRoomDetail] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(localStorageService.get("USER")?.userDTO);
  const orderData = location.state?.dataContext;
  useEffect(() => {
    roomService.getHouseById(id)
      .then((res) => {
        console.log(res);
        setRoomDetail(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
    if (!orderData || !user) {
      navigate('/')
      openNotificationIcon('error', 'Error', 'No Valid');
    }
  }, [])
  const handleBack = () => {
    navigate(`/detail-room/${id}`);
  }
  const handleOrder = () => {
    setIsLoading(true)
    orderService
      .order(id, orderData)
      .then((res) => {
        setIsLoading(false);
        navigate("/profile?tab=order");
        openNotificationIcon('success', 'Success', 'Order Success. Thank you very much!');
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        openNotificationIcon('error', 'Error', 'Order Error. Please Try Again');

      });
  }

  const calculateTotalPrice = () => {
    if (!roomDetail || !orderData) {
      return 0;
    }

    const startDate = moment(orderData.receivedDate);
    const endDate = moment(orderData.checkoutDate);
    const numDays = endDate.diff(startDate, 'days');
    const totalPrice = roomDetail.price * numDays;
    return totalPrice;
  };

  return (
    <div className='container mx-auto pb-5 mb:pt-[0px] sm:pt-[0px] md:pt-[6rem] '>
      <div className='px-14 py-10 '>
        {roomDetail && <div className=' grid grid-cols-2 gap-6 bg-cover rounded-lg px-14 py-20' 
        style={{ backgroundImage: "url('https://img.freepik.com/free-vector/white-gray-geometric-pattern-background-vector_53876-136510.jpg?w=1380&t=st=1691315044~exp=1691315644~hmac=ea948e096648576271309a3612ff47e1b47715ec0327e64e51d9f561aae98be2')" }} >
          <div className='h-[450px] flex-col flex justify-between'>
            <h1 className='font-bold text-[22px] text-primary'>Confirm Order:</h1>
            <div className='my-5'>
              <div className="flex flex-wrap my-3">
                <p className="w-40 font-bold">User Name:</p>
                <p>{user?.userName}</p>
              </div>
              <div className="flex flex-wrap my-3">
                <p className="w-40 font-bold">Room:</p>
                <p>{roomDetail.name.length > 25 ? roomDetail.name.slice(0, 25) + "..." : roomDetail.name}</p>
              </div>
              <div className="flex flex-wrap my-3">
                <p className="w-40 font-bold">Start Day:</p>
                <p>{orderData.receivedDate}</p>
              </div>
              <div className="flex flex-wrap my-3">
                <p className="w-40 font-bold">End Day:</p>
                <p>{orderData.checkoutDate}</p>
              </div>
              <div className="flex flex-wrap my-3">
                <p className="w-40 font-bold">Number Guests:</p>
                <p>{orderData.numGuests}</p>
              </div>
              <div className="flex flex-wrap my-3">
                <p className="w-40 font-bold">Price:</p>
                <p>{roomDetail?.price} $</p>
              </div>
              <div className="flex flex-wrap my-3">
                <p className="w-40 font-bold">Number of Nights:</p>
                <p>{roomDetail && orderData && moment(orderData.checkoutDate).diff(moment(orderData.receivedDate), 'days')}</p>
              </div>
              <div className="flex flex-wrap my-3">
                <p className="w-40 font-bold">Total Price:</p>
                <p>{calculateTotalPrice()} $</p>
              </div>
            </div>

         
           <div className="flex gap-2">
             <button
               className={`flex-1 py-3 bg-white text-black border border-black rounded-lg hover:bg-[#e1e1e1] transition-all ${isLoading ? 'cursor-wait' : 'cursor-pointer'} ${isLoading ? 'opacity-50' : ''}`}
               disabled={isLoading}
               onClick={handleBack}
             >
               {t('Back')}
             </button>
             <button
               className={`flex-1 py-3 bg-primary text-white rounded-lg hover:bg-[#fe474d] transition-all ${isLoading ? 'cursor-wait' : 'cursor-pointer'} ${isLoading ? 'opacity-50' : ''}`}
               disabled={isLoading}
               onClick={handleOrder}
             >
               {isLoading ? t('Loading...') : t('Order')}
             </button>
           </div>
           
          </div>
          <div className='h-[450px]'>
            {roomDetail.images.length > 0 ?
              <img className='h-full w-full object-cover rounded-lg' src={roomDetail?.images[0]} />
              :
              <img className='h-full w-full object-cover rounded-lg' src='https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1691294165~exp=1691294765~hmac=7c06f2486f7f6fac7087bc019656e505dac63be61f79c34193672e36e4daa030' />
            }
          </div>
        </div>}
      </div>
    </div>
  )
}
