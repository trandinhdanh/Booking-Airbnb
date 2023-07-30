import React, { useEffect, useState } from 'react';
import { Button, Modal, Rate, Table, Tag } from 'antd';
import { localStorageService } from '../../services/localStorageService';
import { userService } from '../../services/userService';

export default function FeedbackManager() {
  const [idUser, setIdUser] = useState(localStorageService.get('USER')?.userDTO.id);
  const [orders, setOrders] = useState([]);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  useEffect(() => {
    userService
      .getAllFeedbackByOwner(idUser)
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
      dataIndex: 'nameRoom',
      key: 'nameRoom',
    },
    {
      title: 'Customer',
      dataIndex: 'nameUser',
      key: 'nameUser'
    },
    {
      title: 'Feedback',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Star rating',
      dataIndex: 'numberOfStars',
      key: 'numberOfStars',
      render: (numberOfStars) => <Rate disabled defaultValue={numberOfStars} />,
    },
    {
      title: 'Date',
      dataIndex: 'createDate',
      key: 'createDate',
    },
  ];
  

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
      <Table dataSource={orders} columns={columns}  pagination={pagination}/>
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
