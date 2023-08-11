import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Modal, Button } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdSettingsBackupRestore } from 'react-icons/md';
import { userService } from '../../../services/userService';

export default function UserManager() {
  const { Column } = Table;
  const [customer, setCustomer] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    try {
      const items = await userService.getAllUser();
      setCustomer(items.data);
      console.log(items.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (record) => {
    setSelectedSeller(record);
    setModalVisible(true);
  };

  const handleDeleteSeller = async () => {
    try {
      await userService.lock(selectedSeller.id);
      console.log('Seller deleted successfully');
      // Cập nhật lại danh sách người bán sau khi xóa
      getCustomer();
    } catch (error) {
      console.error('Failed to delete seller:', error);
    }
    setModalVisible(false);
  };
  const handleEdit = async (record) => {
    try {
      await userService.unlock(record.id);
      console.log('Seller deleted successfully');
      // Cập nhật lại danh sách người bán sau khi xóa
      getCustomer();
    } catch (error) {
      console.error('Failed to delete seller:', error);
    }
    setModalVisible(false);
  };


  return (
    <div>
      <Table dataSource={customer}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Username" dataIndex="userName" key="userName" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => (
            <Tag color={status === 'INACTIVE' ? 'red' : 'green'}>{status}</Tag>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              {record.status === 'INACTIVE' ? (
                // Hiển thị nút chỉnh sửa hoặc hành động tùy chọn khác
                <MdSettingsBackupRestore
                  onClick={() => handleEdit(record)}
                  className="text-[20px] hover:scale-125 hover:text-primary transition-all"
                />
              ) : (
                // Hiển thị nút xóa
                <AiOutlineDelete
                  onClick={() => handleDelete(record)}
                  className="text-[20px] hover:scale-125 hover:text-primary transition-all"
                />
              )}
            </Space>
          )}
        />
      </Table>

      <Modal
        title={`Delete Seller ${selectedSeller?.fullName}?`}
        visible={modalVisible}
        onOk={handleDeleteSeller}
        onCancel={() => setModalVisible(false)}
      ></Modal>
    </div>
  );
}