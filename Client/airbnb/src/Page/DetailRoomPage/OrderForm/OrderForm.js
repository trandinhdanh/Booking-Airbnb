import React, {  useState } from "react";
import { DatePicker, message, Space,  } from "antd";
import { InputNumber } from "antd";
import { localStorageService } from "../../../services/localStorageService";

import { t } from "i18next";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { openNotificationIcon } from "../../../Components/NotificationIcon/NotificationIcon";

export default function OrderRoom(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  const [quantityPerson, setQuantityPerson] = useState(1);
  const [idUser, setIdUser] = useState(
    localStorageService.get("USER")?.userDTO.id
  );
  const onChangeInputNumber = (value) => {
    setQuantityPerson(value);
  };

  const onChangeRangePicker = (dates, dateStrings) => {
    setStartDay(dateStrings[0]);
    setEndDay(dateStrings[1]);
  };
  const handleOrder = () => {
    if (!idUser) {
      openNotificationIcon('error', 'Error', 'Please login');
      navigate('/login')
      return;
    }
    if (!startDay || !endDay) {
      openNotificationIcon('error', 'Error', 'Please select start and end dates before placing the order.');
      return;
    }
    const orderData = {
      idUser: idUser,
      status: "pending",
      receivedDate: startDay,
      checkoutDate: endDay,
      numGuests: quantityPerson,
    };
    console.log(orderData);
    navigate(`/confirmOrder/${props.room.id}`, {
      state: { dataContext: orderData },
    });
  };
  const isDisableDate = (date, daybooking) => {
    if (date && date.isBefore(moment().startOf("day"))) {
      return true;
    }
    for (let i = 0; i < daybooking.length; i++) {
      const start = moment(daybooking[i].startDate);
      const end = moment(daybooking[i].endDate);
      if (date.isAfter(start) && date.isBefore(end)) {
        return true;
      }
    }
    return false;
  };
  const calculateTotalPrice = () => {
    if (!startDay || !endDay) {
      return 0;
    }
    const numNights = moment(endDay).diff(moment(startDay), 'days');
    const totalPrice = props.room?.price * numNights;
    return totalPrice;
  };

  return (
    <div
  className="w-full  rounded-[15px]  mt-10 h-full ">
      <section style={{ backgroundImage: "url('https://img.freepik.com/free-psd/3d-mock-up-mid-autumn-festival-with-assortment-elements_23-2149659895.jpg?w=1380&t=st=1691314167~exp=1691314767~hmac=701e5d9b48967e2994554aa03eddc04970ee06adbd2baa18a80078687baf2336')" }} className="bg-cover sticky top-32 rounded-[15px] p-6">
        <div className="flex items-center justify-between">
          <p className="font-bold"> 
            <span className="font-bold text-[22px]">{props.room?.price} $</span> / night
          </p>
          {/* <p>4.38 <span className="reviews">(4 reviews)</span></p> */}
        </div>
        <div className=" rounded-[15px] my-4 py-4">
          <div className="">
          <div className=" py-3  transition duration-300 rounded-full h-full flex flex-wrap justify-center items-center">
              <label
                className={`text-black  text-sm font-bold  mr-3 lg:block md:block sm:hidden mb:hidden`}
              >
                {t("Quantity")}
              </label>
              <InputNumber
                id="guests"
                min={1}
                max={props.room?.maxGuests}
                defaultValue={1}
                onChange={onChangeInputNumber}
              />
            </div>
            <div className="lg:block  md:hidden sm:hidden mb:hidden  py-3  transition duration-300 rounded-full h-full flex flex-wrap justify-center items-center">
              <Space direction="vertical" size={12}>
                <DatePicker.RangePicker
                  disabledDate={(date) => isDisableDate(date, props?.date)}
                  onChange={onChangeRangePicker}
                />
              </Space>
            </div>

           
          </div>
        </div>
        <div className="my-5">
          <div className=" ">
            <button
              className={`w-full py-3 bg-primary text-white rounded-[15px] transition-all`}
              onClick={handleOrder}
            >
              {t('Order')}
            </button>
            <p className="text-center my-3">{t('Direct payment')}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between my-3">
            <p className="w-40 font-bold">Number of Nights:</p>
            <p>{moment(endDay).diff(moment(startDay), 'days')}</p>
          </div>
          <div className="flex justify-between my-3">
            <p className="w-40 font-bold">Total Price:</p>
            <p>{calculateTotalPrice()} $</p>
          </div>
        </div>
      </section>
    </div>
  );
}
