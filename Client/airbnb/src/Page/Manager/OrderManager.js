import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Tag } from 'antd';
import { localStorageService } from '../../services/localStorageService';
import { userService } from '../../services/userService';

export default function OrderManager() {
  const [idUser, setIdUser] = useState(localStorageService.get('USER')?.userDTO.id);
  const [orders, setOrders] = useState([]);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
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
            <Button type="primary" danger onClick={() => showCancelModal(record.id)}>
              Cancel
            </Button>
          );
        }
    },
  ];
  const showCancelModal = (orderId) => {
    // setCancelOrderId(orderId);
    setIsCancelModalVisible(true);
  };

  const handleCancel = () => {
    // orderService.canceluser(cancelOrderId).then((res) => {
    //         console.log(res);
    //         message.success('Cancel Order Success')
    //         fetchOrders();
    //       })
    //       .catch((err) => {
    //         message.error('Cancel Order Error')
    //         console.log(err);
    //       });
    setIsCancelModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsCancelModalVisible(false);
  };
  return (
    <div className="container mx-auto pb-5 mb:pt-[0px] sm:pt-[0px] md:pt-[6rem]">
      <Table dataSource={orders} columns={columns}   pagination={pagination}/>
      <Modal
        title="Order Cancellation Confirmation"
        visible={isCancelModalVisible}
        onOk={handleCancel}
        onCancel={handleCancelModal}
      >
        <p>Are you sure you want to cancel this order?</p>
      </Modal>
    </div>
  );
}
