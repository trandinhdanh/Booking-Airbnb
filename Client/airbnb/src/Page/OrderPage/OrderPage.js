import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { localStorageService } from '../../services/localStorageService';
import { userService } from '../../services/userService';

export default function OrderPage() {
  const [idUser, setIdUser] = useState(localStorageService.get('USER')?.userDTO.id);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    userService
      .getOrder(idUser)
      .then((res) => {
        console.log(res);
        setOrders(res.data); // Lưu trữ dữ liệu đơn hàng vào state
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idUser]);

  // Các cột cho bảng
  const columns = [
   
    {
      title: 'Name Room',
      dataIndex: 'roomDTO',
      key: 'roomDTO',
      render: (roomDTO) => roomDTO.name
    },
    {
      title: 'User ID',
      dataIndex: 'idUser',
      key: 'idUser',
    },
    {
      title: 'Quantity ',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Received Date',
      dataIndex: 'receivedDate',
      key: 'receivedDate',
    },
    {
        title: 'Checkout Date',
        dataIndex: 'checkoutDate',
        key: 'checkoutDate',
      },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div className="container mx-auto pb-5 mb:pt-[0px] sm:pt-[0px] md:pt-[6rem]">
      <Table dataSource={orders} columns={columns} />
    </div>
  );
}
