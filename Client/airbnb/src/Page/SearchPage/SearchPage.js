import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import CardItem from '../../Components/CardItem/CardItem';
import Map from './Map'
import { Badge, Button } from 'antd';
import { useTranslation } from 'react-i18next';
export default function SearchPage() {
  const [address, setAddress] = useState([]);
  const { t } = useTranslation()
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const data = location.state?.dataContext;

  useEffect(() => {
    const addresses = data.map((item) => ({ address: item.address }));
    setAddress(addresses);
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const renderRoomLocation = () => {
    if (data.length === 0) {
      return <div className='col-span-2'>
        <img className="w-full h-full" src='https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=900&t=st=1691316559~exp=1691317159~hmac=ee2bf9c0620b400e717f27ab62d8a69775307d58871897f4285c863e3b70589b'/>
        <p className='text-center'>Not found</p>
      </div>
    }
    return currentItems?.map((item, index) => {
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
         
          <div className="flex justify-center my-4 space-x-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
        <div className="col-span-1 h-full lg:block md:hidden sm:hidden mb:hidden ">
          <div className="h-full">
            <div className="w-full h-full">
              <Map address={address} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
