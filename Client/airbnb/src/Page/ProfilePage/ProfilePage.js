import React, { useEffect, useState } from 'react'
import { localStorageService } from '../../services/localStorageService';
import { Avatar, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import OrderPage from '../OrderPage/OrderPage';
import { FaHeart } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { userService } from '../../services/userService';

export default function ProfilePage() {
  const [user, setuser] = useState(localStorageService.get('USER'));
const [infor, setinfor] = useState({});
  useEffect(() => {
    userService
      .getInformation(user.userDTO.id)
      .then((res) => {
        setinfor(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <div className='container mx-auto pt-28 pb-10 bg-white'>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto pt-10">
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 flex justify-end">
              <div className="w-32 h-32 relative rounded-full overflow-hidden">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-4xl">A</span>
                </div>
              </div>
            </div>

            <div className="col-span-3 flex flex-col justify-center items-start">
              <h2 className="text-3xl font-bold">{infor?.name}</h2>
              <p className="text-gray-600">{infor?.email}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-10">
          <Tabs defaultActiveKey="1" className='mx-10'>
            <TabPane tab={
              <span className='flex items-center' >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24px" height="24px" viewBox="0 0 24 24">
                  <path fill="currentColor" fill-rule="evenodd" d="M10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4Zm3.25 5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Zm1 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Zm1 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75ZM11 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm-2 8c4 0 4-.895 4-2s-1.79-2-4-2s-4 .895-4 2s0 2 4 2Z" clip-rule="evenodd">
                  </path>
                </svg>
                <h2 className='ml-2'>Profile</h2>
              </span>
            } key="1">
              <div className="p-4 grid grid-cols-3 gap-4">
                <div className="col-span-1 bg-white shadow rounded p-4">
                  {/* Personal Information */}
                  <h3 className="text-xl font-bold mb-4">About</h3>
                  <p>Name: {infor?.name}</p>
                  <p>Phone Number: {infor?.phone}</p>
                  <p>Email: {infor?.email}</p>
                  <p>Birthday: {infor?.birthday}</p>
                  <p>Gender: {infor?.gender ? "Male" : "Female"}</p>
                  <p>Is Confirmed: {infor?.isConfirmed !== 1 ? "No" : "Yes" }</p>

                  <p>Active: {infor?.status }</p>
                  {/* Add more personal information here */}
                </div>
                <div className="col-span-2 bg-white shadow rounded p-4">
                  {/* Empty column */}
                </div>
              </div>
            </TabPane>

            <TabPane tab={
              <span className='flex items-center' >
                <FaHeart className='w-[19px] h-[19px]' />
                <span className='ml-2'>Liked</span>
              </span>
            } key="2">
              {/* Content for Posts tab */}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4">Liked Room</h3>
                <div className="bg-white shadow rounded p-4">
                  <p>Liked room here</p>
                </div>
              </div>
            </TabPane>
            <TabPane tab={<span className='flex items-center' >
             <IoMdCart className='w-[22px] h-[22px]'/>
                <span className='ml-2'>Order</span>
              </span>} key="3">
              {/* Content for Photos tab */}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-[-4.5rem]">Your Booked</h3>
                <OrderPage />
              </div>
            </TabPane>

          </Tabs>
        </div>
      </div>


    </div>
  );

};
