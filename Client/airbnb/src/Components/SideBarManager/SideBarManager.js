import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { localStorageService } from '../../services/localStorageService';
import { RiAccountCircleFill, RiFeedbackFill } from 'react-icons/ri';
import { BsHouse, BsFillCartFill } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci'; 
import { AiOutlineBarChart } from 'react-icons/ai'; 
import { MdLocationOn, MdCalendarToday } from 'react-icons/md'
import { BsFillPencilFill } from 'react-icons/bs';
import { logoutUser } from '../../Redux/auth/authSlice';
import { role } from '../../Constant/constant';
import { message } from 'antd';
import { openNotificationIcon } from '../NotificationIcon/NotificationIcon';

export default function SideBarManager() {
  const [user, setUser] = useState(localStorageService.get('USER')?.userDTO);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/login')
      openNotificationIcon("error", "Error" , "Please Login")

    } else if (user.role[0] === role.CUSTOMER) {
      navigate("/");
      openNotificationIcon("error", "Error" , "Not Have Access")
    }
  }, [isLoggedIn, navigate,user]);
  const handleLogout = () => {
    setTimeout(() => {
      localStorageService.remove('USER');
      localStorageService.remove('accessToken');
      dispatch(logoutUser());
      navigate('/login');
    }, 1000);
  };

  const adminData = [
    {
      name: "Users",
      path: "/manager/user",
      Icon: RiAccountCircleFill,
    },
    {
      name: "Blog",
      path: "/manager/blog",
      Icon: BsFillPencilFill,
    },
    {
      name: "Statistical",
      path: "/manager/statistical",
      Icon: AiOutlineBarChart,
    },
    // Add other Admin items here if needed
  ];
  
  const ownerData = [
   
    {
      name: "House",
      path: "/manager/house",
      Icon: BsHouse,
    },
     {
      name: "Statistical",
      path: "/manager/statistical",
      Icon: AiOutlineBarChart,
    },
    {
      name: "Calendar",
      path: "/manager/calendar",
      Icon: MdCalendarToday,
    },
    {
      name: "Feedback",
      path: "/manager/feedback",
      Icon: RiFeedbackFill,
    },
    {
      name: "Order",
      path: "/manager/order",
      Icon: BsFillCartFill,
    },
    {
      name: "Location",
      path: "/manager/location",
      Icon: MdLocationOn,
    },
    {
      name: "Blog",
      path: "/manager/blog",
      Icon: BsFillPencilFill,
    },
  ];
  


  const render = () => {
    const isAdmin = user?.role[0] === role.ADMIN;
    if (isAdmin) {
      return adminData.map((item, i) => (
        <li key={i}>
          <Link
            to={item.path}
            href="#"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <item.Icon className="w-6 h-6 mr-2" />
            <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
          </Link>
        </li>
      ));
    } else {
      return ownerData.map((item, i) => (
        <li key={i}>
          <Link
            to={item.path}
            href="#"
            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <item.Icon className="w-6 h-6 mr-2" />
            <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
          </Link>
        </li>
      ));
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg">
      <div className="w-[300px] h-full ">
        <aside className="w-full " aria-label="Sidebar">
          <div className="overflow-y-auto px-3 bg-gray-50 dark:bg-gray-800 h-screen">
            <ul className="py-10  h-screen flex flex-col justify-between">
              <div className="space-y-2">
                <Link to="/">
                  <img
                    className="w-[110px] h-[32px] mb-5 pl-2"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                    alt=""
                  />
                </Link>
                {render()}
              </div>
              <div>
                <li onClick={handleLogout}>
                  <div
                    href=""
                    className="flex  cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <CiLogout className='text-[20px]' />
                    <span className=" ml-3 whitespace-nowrap">Logout</span>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
