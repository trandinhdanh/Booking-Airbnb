import React, { useEffect, useState } from 'react'
import { localStorageService } from '../../services/localStorageService';
import {  Button, Image, Table, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import OrderPage from '../OrderPage/OrderPage';
import { FaHeart } from 'react-icons/fa';
import { IoMdCart } from 'react-icons/io';
import { userService } from '../../services/userService';
import { favoriteService } from '../../services/favoriteService';
import { Link, useLocation } from 'react-router-dom';
import { openNotificationIcon } from '../../Components/NotificationIcon/NotificationIcon';

export default function ProfilePage() {
  const [user, setuser] = useState(localStorageService.get('USER'));
  const [infor, setinfor] = useState({});
  const [listFavorite, setListFavorite] = useState();
  const [reloadPage, setReloadPage] = useState(false)
  useEffect(() => {
    getUser();
    getFavorite();
  }, [reloadPage]);
  const getUser = () => { 
    userService
    .getInformation(user?.userDTO?.id)
    .then((res) => {
      setinfor(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
   }
   const getFavorite = () => { 
    favoriteService
      .get(user?.userDTO?.id)
      .then((res) => {
        console.log(res);
        setListFavorite(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Link to={`/detail-room/${record?.roomDTO?.id}`}>{record?.roomDTO?.name}</Link>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text,record) => <span>${record?.roomDTO?.price}</span>,
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: (text,record) => (
        <img className='bg-cover w-[100px] h-[100px] rounded-lg ' src={record?.roomDTO?.images[0]} alt="Room"  />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => <span>{record?.roomDTO?.description}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => handleRemoveFavorite(record?.roomDTO?.id)}>Remove</Button>
      ),
    },
  ];

  const handleRemoveFavorite = async (idroom) => {
    try {
      const response = await favoriteService.remove(user?.userDTO?.id,idroom)
      setReloadPage(!reloadPage)
      openNotificationIcon("success" , "Success" , "Remove Favority Success")
    } catch (error) {
      openNotificationIcon("error" , "Error" , "Remove Favority Error")
      console.log(error);
    }
  };

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get('tab') || 'profile';
  return (
    <div className='container mx-auto pt-28 pb-10 bg-white'>
      <div className="bg-gray-100 min-h-screen rounded-lg">
        <div className="container mx-auto py-10 rounded-lg bg-cover" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3798.jpg?w=900&t=st=1691678392~exp=1691678992~hmac=43eeaa7f69b2aebacc7d96446027ae499e180298cb30fd23b870dc5d6798b92d')" }}>
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 flex justify-end">
              <div className="w-32 h-32 relative rounded-full overflow-hidden">
                <img
                  src="https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3798.jpg?w=900&t=st=1691678392~exp=1691678992~hmac=43eeaa7f69b2aebacc7d96446027ae499e180298cb30fd23b870dc5d6798b92d"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <span className="text-white text-4xl">{infor?.name ? infor.name[0].toUpperCase() : 'A'}</span>
                </div>
              </div>
            </div>

            <div className="col-span-3 flex flex-col justify-center items-start">
              <h2 className="text-3xl font-bold">{infor?.name}</h2>
              <p className="text-gray-600">{infor?.email}</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-5">
          
          <Tabs defaultActiveKey={activeTab} className='mx-10'>
            <TabPane tab={
        <Link to="/profile?tab=profile">
              <span className='flex items-center' >
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="24px" height="24px" viewBox="0 0 24 24">
                  <path fill="currentColor"  d="M10 4h4c3.771 0 5.657 0 6.828 1.172C22 6.343 22 8.229 22 12c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12c0-3.771 0-5.657 1.172-6.828C4.343 4 6.229 4 10 4Zm3.25 5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Zm1 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Zm1 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75ZM11 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm-2 8c4 0 4-.895 4-2s-1.79-2-4-2s-4 .895-4 2s0 2 4 2Z" >
                  </path>
                </svg>
                <h2 className='ml-2'>Profile</h2>
              </span></Link>
            } key="profile">
              <div className="py-4 grid grid-cols-3 gap-4">
                <div className="col-span-1 bg-white shadow rounded p-4">
                  {/* Personal Information */}
                  <h3 className="text-xl font-bold mb-4">About</h3>
                  <div className='space-y-4'>
                    <div className='flex items-center'>
                      <p className='w-32'>Name: </p>
                      <span className='font-medium'>{infor?.name}</span>
                    </div>
                    <div className='flex items-center'>
                      <p className='w-32'>Phone Number: </p>
                      <span className='font-medium'>{infor?.phone}</span>
                    </div>
                    <div className='flex items-center'>
                      <p className='w-32'>Email: </p>
                      <span className='font-medium'>{infor?.email}</span>
                    </div>
                    <div className='flex items-center'>
                      <p className='w-32'>Birthday: </p>
                      <span className='font-medium'>{infor?.birthday}</span>
                    </div>
                    <div className='flex items-center'>
                      <p className='w-32'>Gender: </p>
                      <span className='font-medium'>{infor?.gender ? "Male" : "Female"}</span>
                    </div>
                    <div className='flex items-center'>
                      <p className='w-32'>Is Confirmed: </p>
                      <span className='font-medium'>{infor?.isConfirmed === 1 ? "No" : "Yes"}</span>
                    </div>
                    <div className='flex items-center'>
                      <p className='w-32'>Active: </p>
                      <span className='font-medium'>{infor?.status}</span>
                    </div>
                  </div>

                  {/* Add more personal information here */}
                </div>
                <div className="col-span-2 bg-white shadow rounded p-4 h-[450px]">
                  {/* Empty column */}
                  <img className='w-full h-full bg-cover' src='https://img.freepik.com/free-vector/flat-design-travel-twitch-background_23-2149081581.jpg?w=900&t=st=1691678223~exp=1691678823~hmac=98d58011db4925f96a1b22d38972aed1e7fb79b43f369c948f9456bb49d390d3' />
                </div>
              </div>
            </TabPane>

            <TabPane tab={
              <Link to="/profile?tab=liked">

             
              <span className='flex items-center' >
                <FaHeart className='w-[19px] h-[19px]' />
                <span className='ml-2'>Liked</span>
              </span> </Link>
            } key="liked">
              {/* Content for Posts tab */}
              <div className="p-4">
                <div className="bg-white shadow rounded p-4">
                  <p>Liked room here</p>
                  <Table
                    dataSource={listFavorite}
                    columns={columns}
                    rowKey="id"
                    pagination={{
                      total: listFavorite?.length,
                      pageSize: 3,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab={
             <Link to="/profile?tab=order">
              <span className='flex items-center' >
              <IoMdCart className='w-[22px] h-[22px]' />
              <span className='ml-2'>Order</span>
            </span>
              </Link>
          } key="order">
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
