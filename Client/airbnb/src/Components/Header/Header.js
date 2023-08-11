import React, { useEffect, useState } from 'react';
import UserNav from './UserNav';
import { FaSearch } from 'react-icons/fa';
import { DatePicker, Space, Select, InputNumber } from 'antd';
import './Header.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { locationService } from '../../services/locationService';
import { roomService } from '../../services/RoomService';
import { openNotificationIcon } from '../NotificationIcon/NotificationIcon';
export default function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [bg, setBg] = useState(false);
  const [location, setLocation] = useState();
  const [idLocation, setIdLocation] = useState();
  const [quantity, setQuantity] = useState(1);
  const [dataContext, setDataContext] = useState(null);

  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const navigate = useNavigate();
  const onChangeQuantity = (value) => {
    setQuantity(value)
  };
  const onChange = (value) => {
    setIdLocation(value)
  };

  useEffect(() => {
    locationService.getLocationList().then((res) => {
      setLocation(res.data)
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const closeNav = () => {
    // if (location.pathname === "/") {
    // }
    // window.scrollY === 0 ? setBg(true) : setBg(false);
    // console.log(window.location.href);
    if (window.scrollY >= 100) {
      setOpen(false);
      setBg(false);
    }
  };
  window.addEventListener('scroll', closeNav);

  const renderOption = () => {
    return location?.map((item, index) => {
      return (
        <Option key={index} value={item.id}>
          {item.name}
        </Option>
      );
    });
  };
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();

  const onChangeRangePicker = (dates, dateStrings) => {
    setStartDay(dateStrings[0])
    setEndDay(dateStrings[1])
  };
  const searchBtn = () => {
    const searchData = {
      idLocation: idLocation,
      startDate: startDay,
      endDate: endDay,
      guests: quantity, // Số lượng người
    };
    if (!startDay || !endDay || !idLocation) {
      openNotificationIcon('error', 'Error', 'Please select enough information')
    } else {
      roomService.searchRoom(searchData)
        .then((res) => {
          setDataContext(res.data)
          openNotificationIcon('success', 'Success', 'Search Success')

          navigate('/search', { state: { dataContext: res.data } });
        })
        .catch((err) => {
          openNotificationIcon('error', 'Error', 'Please Try Again')

        });
    }
  };
  const resetSearch = () => {
    setLocation(null);
    setIdLocation(null);
    setQuantity(1);
    setStartDay(null);
    setEndDay(null);
    setDataContext(null);
  };
  return (
    <div
      // style={{ boxShadow: `${open ? '' : 'rgba(0, 0, 0, 0.45) 0px 20px 20px -20px'}` }}
      // style={{ borderBottom: `${open ? '1px solid #c5c5c578' : ''}` }}
      className={`${bg ? 'lg:bg-transparent ' : 'bg-white border-b-[1px] border-b-[#c5c5c578] '
        } fixed top-0 z-40 w-screen transition duration-300 `}
    >
      {/* Search Home */}
      <div
        style={{ boxShadow: 'rgb(0 0 0 / 9%) 0px 4px 2px' }}
        className={`${bg ? 'bg-transparent top-[80px]' : 'bg-white top-[70px]'
          } absolute left-0  transition-all duration-500  w-full ${open ? 'h-[150px]' : 'overflow-hidden h-0 '
          }`}
      >
        <div className="flex items-center justify-center  h-full">
          <div className="flex items-center border-[1px] rounded-full">
            {/*  Location */}
            <div className="px-5 py-3 hover:bg-gray-200 transition duration-300 rounded-full h-full flex flex-wrap justify-center items-center">
              <label
                className={`${bg ? 'text-white' : 'text-black'
                  } block text-sm font-medium  mr-3 lg:block md:block sm:hidden mb:hidden`}
              >
                {t('Any Location')}
              </label>
              <Select
                style={{
                  width: 160,
                }}
                showSearch
                placeholder={t('Location')}
                optionFilterProp="children"
                className="dropdow-header"
                onChange={onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
                {renderOption()}
              </Select>
            </div>
            {/* End Location */}

            {/*  Date */}
            <div className=" px-5 py-3 hover:bg-gray-200 transition duration-300 rounded-full h-full flex flex-wrap justify-center items-center">
              <Space direction="vertical" size={12}>
                <DatePicker.RangePicker onChange={onChangeRangePicker} />
              </Space>
            </div>
            {/* End Date */}


            {/* Quantity  */}
            <div className="px-5 py-3 hover:bg-gray-200 transition duration-300 rounded-full h-full flex flex-wrap justify-center items-center">
              <label
                className={`${bg ? 'text-white' : 'text-black'
                  } block text-sm font-medium  mr-3 lg:block md:block sm:hidden mb:hidden`}
              >
                {t('Quantity')}
              </label>
              <InputNumber min={1} max={10} defaultValue={1} onChange={onChangeQuantity} />
            </div>
            {/*End Quantity */}

            {/* Search Button */}
            <div className="px-5 py-3 hover:bg-gray-200 transition duration-300 rounded-full h-full flex flex-wrap justify-center items-center">
              <button
                onClick={searchBtn}
                className="bg-[#FF385C] hover:bg-red-500 transition duration-300 px-5 py-2 rounded font-bold text-white"
              >
                {t('Search')}
              </button>
            </div>
            {/* End Search Button */}

          </div>
        </div>
      </div>
      <nav
        className={`${bg ? 'py-5' : 'py-3'
          } transition-all container mx-auto duration-500 relative  flex items-center lg:justify-between md:justify-between sm:justify-center mb:justify-center`}
      >
        {/* LEFT */}
        <NavLink to="/">
          <div className="logo lg:block  md:hidden sm:hidden mb:hidden animate__animated animate__fadeInLeft">
            <img
              className="w-[102px] h-[32px]"
              src={`${bg
                  ? ' https://www.pngkey.com/png/full/60-606021_horizontal-white-transparent-for-web-airbnb-logo-white.png'
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png'
                }`}
              alt=""
            />
          </div>
        </NavLink>
        {/* END LEFT */}

        {/* MIDDLE */}
        <>
          {!dataContext && (
            <div
              onClick={() => {
                setOpen(!open);
              }}
              style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
              className="flex z-20 items-center px-3 py-2 rounded-3xl border border-gray-300 "
            >
              <div
                className={`font-medium cursor-pointer px-2 lg:border-r-2 md:border-r-2 lg:w-[130px] md:w[130px] sm:w-[280px] mb:w-[280px]`}
              >
                <h1
                  className={`${bg ? 'md:text-black sm:text-black lg:text-white' : 'lg:text-black'}`}
                >
                  {t('Any Location')}
                </h1>
              </div>
              <div className="font-medium  cursor-pointer  px-2 lg:block md:hidden sm:hidden mb:hidden border-r-2">
                <h1
                  className={`${bg ? 'md:text-black sm:text-black lg:text-white' : 'lg:text-black'}`}
                >
                  {t('Any Week')}
                </h1>
              </div>
              <div className="font-medium  cursor-pointer  px-2 lg:block md:hidden sm:hidden mb:hidden ">
                <h1
                  className={`${bg ? 'md:text-black sm:text-black lg:text-white' : 'lg:text-black'}`}
                >
                  {t('Add Guest')}
                </h1>
              </div>
              <div className="p-2 bg-[#FF385C] rounded-3xl">
                <FaSearch className="text-white" />
              </div>
            </div>
          )}
          {dataContext && (
            <div
              onClick={() => {
                setOpen(!open);
              }}
              style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
              className="flex z-20 items-center px-3 py-2 rounded-3xl border border-gray-300 "
            >
              <div
                className={`font-medium cursor-pointer px-2 lg:border-r-2 md:border-r-2 lg:w-[130px] md:w[130px] sm:w-[280px] mb:w-[280px]`}
              >
                <h1
                  className={`${bg ? 'md:text-black sm:text-black lg:text-white' : 'lg:text-black'
                    } overflow-hidden whitespace-nowrap text-ellipsis`}
                >
                  {location?.find((item) => item.id === idLocation)?.name || t('Any Location')}
                </h1>
              </div>
              <div className="font-medium  cursor-pointer  px-2 lg:block md:hidden sm:hidden mb:hidden border-r-2">
                <h1
                  className={`${bg ? 'md:text-black sm:text-black lg:text-white' : 'lg:text-black'}`}
                >
                  {startDay && endDay ? `${startDay} / ${endDay}` : t('Any Week')}
                </h1>
              </div>
              <div className="font-medium  cursor-pointer  px-2 lg:block md:hidden sm:hidden mb:hidden ">
                <h1
                  className={`${bg ? 'md:text-black sm:text-black lg:text-white' : 'lg:text-black'}`}
                >
                  {`${quantity} ${t('Guest')}`}
                </h1>
              </div>
              <div className="p-2 bg-[#FF385C] rounded-3xl">
                <FaSearch className="text-white" />
              </div>
            </div>
          )}
        </>
        {/* END MIDDLE */}


        {/* RIGHT */}
        <UserNav bg={bg} />
        {/* END RIGHT */}
      </nav>
    </div>
  );
}
