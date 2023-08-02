import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Tag, Form, Input, message } from "antd";
import { localStorageService } from "../../services/localStorageService";
import { userService } from "../../services/userService";
import { feedBackService } from "../../services/feedBackService";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { Rate } from "antd";

export default function OrderPage() {
  const [idUser, setIdUser] = useState(
    localStorageService.get("USER")?.userDTO.id
  );
  const [orders, setOrders] = useState([]);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [feedbackContent, setFeedbackContent] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [feedbackStars, setFeedbackStars] = useState(3); // Giá trị mặc định là 3 sao
  const [feedbacks, setFeedbacks] = useState(); // Giá trị mặc định là 3 sao
  const [pageSize, setPageSize] = useState(5);
  
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
  useEffect(() => {
    userService
      .getFeedBack(idUser)
      .then((res) => {
        console.log(res);
        setFeedbacks(res.data); // Lưu trữ dữ liệu đơn hàng vào state
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
      title: "Name Room",
      dataIndex: "roomDTO",
      key: "roomDTO",
      render: (roomDTO) => roomDTO.name,
    },
    {
      title: "Quantity ",
      dataIndex: "numGuests",
      key: "numGuests",
    },
    {
      title: "Received Date",
      dataIndex: "receivedDate",
      key: "receivedDate",
    },
    {
      title: "Checkout Date",
      dataIndex: "checkoutDate",
      key: "checkoutDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => {
        return (
          <div className="space-x-2">
            <Button
              type="default"
              danger
              onClick={() => showFeedbackModal(record.id)}
            >
              Feed Back
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => showCancelModal(record.id)}
            >
              Cancel
            </Button>
          </div>
        );
      },
    },
  ];
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };
  const showCancelModal = (orderId) => {
    setCancelOrderId(orderId);
    setIsCancelModalVisible(true);
  };

  const handleCancel = () => {
    setIsCancelModalVisible(false);
    message.success("Order cancelled successfully");
  };

  const handleCancelModal = () => {
    setIsCancelModalVisible(false);
  };

  const showFeedbackModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsFeedbackModalVisible(true);
    // Thực hiện các bước khác liên quan đến việc hiển thị modal đăng feedback (nếu cần)
  };

  const handleFeedback = () => {
    const feedbackData = {
      content: feedbackContent,
      numberOfStars: feedbackStars,
      idUserCreate: idUser,
      idOrder: selectedOrderId,
    };
    feedBackService
      .create(feedbackData)
      .then((res) => {
        console.log(res);
        message.success("Feedback submitted successfully");
      })
      .catch((err) => {
        console.log(err);
        message.error("Feedback submitted error");
      });
    setIsFeedbackModalVisible(false);
  };

  const handleFeedbackModalCancel = () => {
    setIsFeedbackModalVisible(false);
  };
  const renderFeedback = (record) => {
    const feedbacksForOrderId = feedbacks?.filter(
      (item) => item.idOrder === record.id
    );
  
    if (!feedbacksForOrderId || feedbacksForOrderId.length === 0) {
      return <p>No feedbacks found for this order.</p>;
    }
  
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Feedbacks for Order ID: {record.id}
        </h3>
        {feedbacksForOrderId.map((feedback) => (
          <div key={feedback.id} className="flex items-center mb-2">
            <p className="flex-grow">- {feedback.content}</p>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                  {i < feedback.numberOfStars ? (
                    <StarFilled className="text-yellow-500" />
                  ) : (
                    <StarOutlined className="text-yellow-500" />
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="container mx-auto pb-5 mb:pt-[0px] sm:pt-[0px] md:pt-[6rem]">
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        pagination={{
          total: orders?.length,
          pageSize: pageSize,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        expandable={{
          expandedRowRender: renderFeedback ,
        }}
      />
      <Modal
        title="Order Cancellation Confirmation"
        visible={isCancelModalVisible}
        onOk={handleCancel}
        onCancel={handleCancelModal}
      >
        <p>Are you sure you want to cancel this order?</p>
      </Modal>
      <Modal
        title="Order Feedback"
        visible={isFeedbackModalVisible}
        onOk={handleFeedback}
        onCancel={handleFeedbackModalCancel}
      >
        <Form>
          <Form.Item label="Your Feedback">
            <Input.TextArea
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
            />
          </Form.Item>
          <Rate
            defaultValue={3} // Giá trị mặc định là 3 sao
            character={({ index }) => customIcons[index + 1]}
            value={feedbackStars} // Sử dụng state feedbackStars để hiển thị giá trị đánh giá sao
            onChange={(value) => setFeedbackStars(value)} // Cập nhật giá trị đánh giá sao khi người dùng thay đổi
          />
        </Form>
      </Modal>
    </div>
  );
}
