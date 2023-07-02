import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CardItem from '../../Components/CardItem/CardItem';
import Map from './Map'
import { Badge } from 'antd';
import { useTranslation } from 'react-i18next';
export default function SearchPage() {
  const [address, setAddress] = useState([]);
    const {t} = useTranslation()
    const location = useLocation();
  const data = location.state?.dataContext;

  useEffect(() => {
    const addresses = data.map((item) => ({ address: item.address }));
    setAddress(addresses);
    
  }, []);
  const renderRoomLocation = () => {
    return data?.map((item, index) => {
   
      return (
        <div className="col-span-1 relative" key={index}>
          {!item.available && (
            <div className='z-30 absolute top-5 bg-primary text-white text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full uppercase '>
              {t('Out of room')}
            </div>
          )}
          <CardItem roomInfor={item} /> 
        </div>
      );
    });
  };
  
  return (
    <div className=" lg:mt-0 md:mt-10 sm:mt-10 mb:mt-10">
    <div className="container mx-auto grid lg:grid-cols-2 md:col-span-1 sm:col-span-1 mb:col-span-1 gap-5 ">
      <div className="col-span-1 mb-10 mt-20">
        <div className="mb-10">
          <h1 className="text-base font-medium">{data?.length} Experiences</h1>
          <h1 className="font-bold text-2xl "> Experiences near you</h1>
        
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 mb:grid-cols-1 gap-5">
          {renderRoomLocation()}
        </div>
      </div>
      <div className="col-span-1 h-full lg:block md:hidden sm:hidden mb:hidden ">
        <div className="h-full">
          <div className="w-full h-full">
            <Map address={address}/>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
