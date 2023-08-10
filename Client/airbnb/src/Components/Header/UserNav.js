import React, { useEffect, useState } from 'react';
import { TbWorld } from 'react-icons/tb';
import { RiAccountCircleFill, RiMenuFill } from 'react-icons/ri';
import './UserNav.modul.scss';
import { Link, useNavigate } from 'react-router-dom';
import { localStorageService } from '../../services/localStorageService';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
// import { loginUser, logoutUser } from '../../redux/auth/authSlice';
// import { userService } from '../../services/userService';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '../../Redux/auth/authSlice';
export default function UserNav({ bg }) {
  const [open, setOpen] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [isUser, setisUser] = useState();
  const [user, setuser] = useState(localStorageService.get('USER'));

  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpenLanguage(false);
  };
  useEffect(() => {
    if (user) {
      setisUser(user);
    }
  }, []);
  useEffect(() => {
    setisUser(user);
  }, [user]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogOut = () => { 
    dispatch(logoutUser())
    navigate('/login')
  };
  const handleHost = () => { 
    dispatch(logoutUser())
    navigate('/register-owner')
  }
  const closeDropDown = () => {
    setOpen(false);
    setOpenLanguage(false);
  };
  return (
    <>
      <div
        onClick={() => {
          setOpenLanguage(false);
          setOpen(false);
        }}
        className={`${
          open || openLanguage
            ? 'animate__fadeIn animate__animated fixed top-0 left-0 w-screen h-screen bg-transparent'
            : 'hidden'
        }`}
      ></div>
      <div className="text-[14px] relative flex items-center lg:flex  md:flex sm:flex  mb:hidden animate__animated animate__fadeInRight">
        <h1
          className={`${
            bg ? 'sm:text-black lg:text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200'
          } font-medium text-sm rounded-3xl py-2 px-4  transition duration-300 cursor-pointer`}
        onClick={() => handleHost()}
        >
          {t('Become a Host')}
        </h1>
        <div
          onClick={() => {
            setOpenLanguage(!openLanguage);
            setOpen(false);
          }}
          className={`${
            bg ? 'sm:text-black lg:text-white hover:bg-gray-700' : 'text-black hover:bg-gray-200'
          } rounded-3xl py-2 px-2 transition duration-300 mx-2`}
        >
          <TbWorld className="text-xl " />
        </div>
        {/* DROPDOWN LANGUAGE */}
        <div className="dropdownLanguge relative ">
          <ul
            className={`${
              openLanguage ? '' : 'hidden'
            } animate__animated animate__fadeInUp bg-white dropdownLanguage rounded-xl border border-gray-300 transition duration-500`}
          >
            <li
               onClick={() => handleChangeLanguage("vi")}
              className="dropdownItem cursor-pointer  hover:bg-gray-200 transition duration-300"
            >
              <p className="hover:text-black transition duration-100">Tiếng Việt</p>
            </li>
            <li
               onClick={() => handleChangeLanguage("en")}
              className="dropdownItem cursor-pointer  hover:bg-gray-200 transition duration-300"
            >
              <p className="hover:text-black transition duration-100">English</p>
            </li>
            <li
               onClick={() => handleChangeLanguage("fr")}
              className="dropdownItem cursor-pointer  hover:bg-gray-200 transition duration-300"
            >
              <p className="hover:text-black transition duration-100">Français</p>
            </li>
          </ul>
        </div>
        <div
          onClick={() => {
            setOpen(!open);
            setOpenLanguage(false);
          }}
          className="flex items-center py-1 px-[6px] hover:shadow-xl transition-all rounded-3xl border border-gray-300"
        >
          <RiMenuFill
            className={`${
              bg ? 'sm:text-black lg:text-white' : 'text-black '
            } text-[16px] mr-[0.2rem]`}
          />
            <RiAccountCircleFill
              className={`${bg ? 'sm:text-black lg:text-white' : 'text-black '} text-[30px]`}
            />
        </div>
        {/* DROPDOWN INFOR */}
        <div className="dropdownMenu relative ">
          <ul
            className={`animate__animated animate__fadeInUp  bg-white dropdown rounded-xl border border-gray-300 transition duration-500 ${
              open ? '' : 'hidden'
            } `}
          >
            <li className="dropdownItem  hover:bg-gray-200 transition duration-300">
              {isUser ? (
                <Link
                  onClick={() => {
                    closeDropDown();
                  }}
                  to="/profile"
                  className="hover:text-black font-[700] transition duration-100 text-[#FF385C] text-left overflow-hidden w-full"
                >
                 {t('Hello ') + ' ' + (user?.userDTO?.userName.length > 15 ? user?.userDTO?.userName.slice(0, 15) +"..." : user?.userDTO?.userName)}
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="w-full block h-full hover:text-black transition duration-100"
                >
                  {t('Register')}
                </Link>
              )}
            </li>
            {/* {user?.userDTO?.role[0] === 'CUSTOMER' && 
              <Link
                onClick={() => {
                  closeDropDown();
                }}
                to="/trip"
              >
                <li className="dropdownItem  hover:bg-gray-200 transition duration-300">
                  <p className="w-full block h-full text-left hover:text-black transition duration-100">
                    {t('My Trips')}
                  </p>
                </li>
              </Link>
            } */}
            {user?.userDTO?.role[0] === 'ADMIN' || user?.userDTO?.role[0] === 'OWNER' ? (
              <Link
                onClick={() => {
                  closeDropDown();
                }}
                to="/manager"
              >
                <li className="dropdownItem  hover:bg-gray-200 transition duration-300">
                  <p className="w-full block h-full text-left hover:text-black transition duration-100">
                    {'Manager'}
                  </p>
                </li>
              </Link>
            ) : (
              ''
            )}
            <li className="dropdownItem  hover:bg-gray-200 transition duration-300">
              {isUser ? (
                <button
                  onClick={handleLogOut}
                  className="w-full block h-full text-left hover:text-black transition duration-100"
                >
                  {t('Logout')}
                </button>
              ) : (
                <Link
                  to="/Login"
                  className="w-full block h-full hover:text-black transition duration-100"
                >
                  {t('Login')}
                </Link>
              )}
            </li>
            <div className="bg-gray-300 w-full h-[1px] my-[5px]"></div>
            <li className="dropdownItem  hover:bg-gray-200 transition duration-300">
              <p className="hover:text-black transition duration-100">{t('House for rent')}</p>
            </li>
            <li className="dropdownItem  hover:bg-gray-200 transition duration-300">
              <p className="hover:text-black transition duration-100">
                {t('Organize the experience')}
              </p>
            </li>
            <li className="dropdownItem  hover:bg-gray-200 transition duration-300">
              <p className="hover:text-black transition duration-100">{t('Help')}</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

