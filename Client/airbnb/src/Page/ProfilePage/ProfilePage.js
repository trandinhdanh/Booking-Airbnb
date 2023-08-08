import React, { useEffect, useState } from 'react'
import { localStorageService } from '../../services/localStorageService';
import { Avatar, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import OrderPage from '../OrderPage/OrderPage';

export default function ProfilePage() {
  const [user, setuser] = useState(localStorageService.get('USER'));

  useEffect(() => {
    // Your useEffect logic goes here
    console.log(user);
  }, []);

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
              <h2 className="text-3xl font-bold">Nguyễn trường giang</h2>
              <p className="text-gray-600">dm.wibu@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto mt-10">
          <Tabs defaultActiveKey="1" className='mx-10'>
            <TabPane tab="Profile" key="1">
              <div className="p-4 grid grid-cols-3 gap-4">
                <div className="col-span-1 bg-white shadow rounded p-4">
                  {/* Personal Information */}
                  <h3 className="text-xl font-bold mb-4">About</h3>
                  <p>Name: Nguyễn trương giang</p>
                  <p>Email: @gmail.com</p>
                  {/* Add more personal information here */}
                </div>
                <div className="col-span-2 bg-white shadow rounded p-4">
                  {/* Empty column */}
                </div>
              </div>
            </TabPane>
            <TabPane tab="Like" key="2">
              {/* Content for Posts tab */}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4">Liked Room</h3>
                <div className="bg-white shadow rounded p-4">
                  <p>Liked room here</p>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Orders" key="3">
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
