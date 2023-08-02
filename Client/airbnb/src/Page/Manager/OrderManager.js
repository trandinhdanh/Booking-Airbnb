import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Tag } from 'antd';
import { localStorageService } from '../../services/localStorageService';
import { userService } from '../../services/userService';

export default function OrderManager() {
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [orders, setOrders] = useState([]);
  const [idUser, setIdUser] = useState(localStorageService.get('USER')?.userDTO.id);
 
  useEffect(() => {
    userService
      .getOrderByOwner(idUser)
      .then((res) => {
        console.log(res);
        setOrders(res.data); // Lưu trữ dữ liệu đơn hàng vào state
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idUser]);
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRM":
        return "blue";
      case "BOOKED":
        return "yellow";
      case "CHECKED_IN":
        return "green";
      default:
        return "red";
    }
  };
  // Các cột cho bảng
  const columns = [
   
    {
      title: 'Name Room',
      dataIndex: 'roomDTO',
      key: 'roomDTO',
      render: (roomDTO) => roomDTO.name
    },
  
    {
      title: 'Quantity ',
      dataIndex: 'numGuests',
      key: 'numGuests',
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
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: '',
      key: 'actions',
      render: (text, record) => {
          return (
            <Button type="" className='bg-[#068FFF] text-white' danger onClick={() => showModal(record.id)}>
              Update
            </Button>
          );
        }
    },
  ];
  const showModal = (orderId) => {
    // setCancelOrderId(orderId);
    setIsCancelModalVisible(true);
  };

  const handleCancel = () => {
    setIsCancelModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsCancelModalVisible(false);
  };
  return (
    <div className="container mx-auto pb-5 mb:pt-[0px] sm:pt-[0px] md:pt-[6rem]">
      <Table dataSource={orders} columns={columns}   pagination={{
          total: orders?.length,
          pageSize: pageSize,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}/>
      <Modal
        title="Order Update Status"
        visible={isCancelModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className='text-center flex-col flex space-y-3'>
           <button className='px-4 py-2 bg-[#1c6c59] rounded-lg text-white'>CONFIRM</button>
           <button className='px-4 py-2 bg-primary rounded-lg text-white'>CANCEL</button>
        </div>
      </Modal>
    </div>
  );
}
