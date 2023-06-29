import React, { useEffect, useState } from 'react'
import { DatePicker, message, Space, Select, notification, Button } from 'antd';
import { InputNumber } from 'antd';
import { localStorageService } from '../../../services/localStorageService';
import { orderService } from '../../../services/orderService';
import { userService } from '../../../services/userService';
export default function OrderRoom(props) {
    const [startDay,setStartDay] = useState();
    const [endDay,setEndDay] = useState();
    const [quantityPerson,setQuantityPerson] = useState(0);
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
            idRoom: props.room?.id, // Thay thế bằng ID của phòng hiện tại
            status: 'pending', // Trạng thái đặt hàng, có thể là 'pending', 'confirmed',...
            receivedDate: startDay, // Ngày nhận phòng
            checkoutDate: endDay, // Ngày trả phòng
            quantity: quantityPerson, // Số lượng người
          };
          console.log(orderData);
          orderService.order(orderData)
          .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
    }
  return (
    <div>              <main className="flex items-center justify-center h-screen">
    <section className="order-container bg-white border border-gray-300 rounded p-6 shadow">
      <div className="flex items-center justify-between">
        <p><span className="cost">{props.room?.price} $</span> / night</p>
        <p>4.38 <span className="reviews">(4 reviews)</span></p>
      </div>
      <div className="order-data border border-gray-200 rounded my-4 p-4">
        <div className="flex justify-between">
        <div className="lg:block  md:hidden sm:hidden mb:hidden px-5 py-3 hover:bg-gray-200 transition duration-300 rounded-full h-full flex flex-wrap justify-center items-center">
              <Space direction="vertical" size={12}>
              <DatePicker.RangePicker onChange={onChangeRangePicker} />
              </Space>
              <div className="input-number-wrapper">
                  <label htmlFor="guests" className="label">Số lượng người:</label>
                  <InputNumber
                    id="guests"
                    min={1}
                    max={props.room?.maxGuests}
                    defaultValue={3}
                    onChange={onChangeInputNumber}
                  />
                </div>
        </div>
        
        </div>
      </div>
      <div className="grid grid-cols-10 grid-rows-10 gap-0 relative btn-container">
        <div className="cell col-span-10 row-span-10" />
        <div className="content col-span-10 row-span-10 flex justify-center items-center rounded">
         <Button onClick={handleOrder}>Order</Button>
        </div>
      </div>
    </section>
  </main></div>

  )
}
