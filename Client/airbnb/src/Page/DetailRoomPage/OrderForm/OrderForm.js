import React, { useEffect, useState } from 'react'
import { DatePicker, message, Space, Select, notification, Button } from 'antd';
import { InputNumber } from 'antd';
import { localStorageService } from '../../../services/localStorageService';
import { orderService } from '../../../services/orderService';
import { userService } from '../../../services/userService';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
export default function OrderRoom(props) {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [startDay,setStartDay] = useState();
    const [endDay,setEndDay] = useState();
    const [quantityPerson,setQuantityPerson] = useState(1);
    const [idUser,setIdUser] = useState(localStorageService.get('USER')?.userDTO.id)
    
    const onChangeInputNumber = (value) => {
      console.log('changed', value);
      setQuantityPerson(value)
    };
    
    const onChangeRangePicker = (dates, dateStrings) => {
        console.log('Selected Dates:', dateStrings);
        setStartDay(dateStrings[0])
        setEndDay(dateStrings[1])
    };
    const handleOrder = () => { 
        const orderData = {
            idUser: idUser, // Thay thế bằng ID của người dùng hiện tại
            status: 'pending', // Trạng thái đặt hàng, có thể là 'pending', 'confirmed',...
            receivedDate: startDay, // Ngày nhận phòng
            checkoutDate: endDay, // Ngày trả phòng
            numGuests: quantityPerson, // Số lượng người
          };
          console.log(orderData);
          orderService.order(props.room.id,orderData)
          .then((res) => {
            console.log(res);
            message.success("ORDER SUCCESS")
            navigate('/order')
          })
          .catch((err) => {
            console.log(err);
            message.error("ORDER ERROR")
          });
    }
    const disabledDate = (current) => {
      const disabledDates = [
        { startDate: '2023-07-14', endDate: '2023-07-16' },
        { startDate: '2023-07-24', endDate: '2023-07-26' },
      ];
  
  
      return disabledDates.some((date) =>
        moment(current).isBetween(date.startDate, date.endDate, undefined, '[]')
      );
    };
  return (
    <div className='w-full relative  rounded-lg border-black mt-10'>             
    <section className=" bg-white border border-gray-300 rounded-lg p-6 shadow">
      <div className="flex items-center justify-between">
        <p><span className="font-bold">{props.room?.price} $</span> / night</p>
        {/* <p>4.38 <span className="reviews">(4 reviews)</span></p> */}
      </div>
      <div className="order-data border border-gray-200 rounded-lg my-4 p-4">
        <div className="">
        <div className="lg:block  md:hidden sm:hidden mb:hidden px-5 py-3 hover:bg-gray-200 transition duration-300 rounded-full h-full flex flex-wrap justify-center items-center">
              <Space direction="vertical" size={12}>
              <DatePicker.RangePicker   disabledDate={disabledDate}  onChange={onChangeRangePicker} />
              </Space>
        </div>
       
        <div className="px-5 py-3 hover:bg-gray-200 transition duration-300 rounded-full h-full flex flex-wrap justify-center items-center">
              <label
                className={`text-black  text-sm   mr-3 lg:block md:block sm:hidden mb:hidden`}
              >
                {t('Quantity')}
              </label>
              <InputNumber
                    id="guests"
                    min={1}
                    max={props.room?.maxGuests}
                    defaultValue={1}
                    onChange={onChangeInputNumber}
                  />
            </div>
        </div>
      </div>
      <div className="grid grid-cols-10 grid-rows-10 gap-0 relative btn-container">
        <div className="cell col-span-10 row-span-10" />
        <div className="content col-span-10 row-span-10 flex justify-center items-center rounded">
         <button className='w-full py-3 bg-primary text-white rounded-lg hover:bg-[#fe474d] transition-all' onClick={handleOrder}>{t('Order')}</button>
        </div>
      </div>
    </section>
  </div>

  )
}
