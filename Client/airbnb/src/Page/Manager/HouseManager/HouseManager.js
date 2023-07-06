import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Modal } from 'antd';
import { AiOutlineDelete,AiOutlineEdit } from 'react-icons/ai';
import {IoIosAddCircleOutline} from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import { roomService } from '../../../services/RoomService';

export default function HouseManager() {
  const { Column } = Table;
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(3);
  const [houses, setHouses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    const getHouses = async () => {
      try {
        const items = await roomService.getHouseList();
        setHouses(items.data);
      } catch (error) {
        console.log(error);
      }
    };
    getHouses();
  }, []);

  const handleDelete = (record) => {
    setSelectedHouse(record);
    setModalVisible(true);
  };

  const handleDeleteHouse = async () => {
    setModalVisible(false);
    // TODO: Gọi API xóa house theo selectedHouse.id
    // Sau khi xóa thành công, cập nhật lại danh sách houses bằng cách gọi API getHouses()
  };

  return (
    <div className="w-full">
       <div className="headerManager font-roboto mb-5 flex justify-between">
        <h1 className="font-bold text-[20px] uppercase ">
        Rooms Management
        </h1>
        <button onClick={() => { navigate('/manager/house-add') }} className="text-white bg-primary font-medium rounded-lg text-sm px-4 py-2 flex items-center hover:scale-110 transition-all">Add <IoIosAddCircleOutline className='ml-2 text-[20px]'/> </button>
      </div>
      <Table
        dataSource={houses}
        pagination={{
          total: houses?.length,
          pageSize: pageSize,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Image"
          dataIndex="images"
          key="images"
          render={(images) => (
            <img src={images[0]} className="w-[70px] h-[70px] object-cover rounded-lg" alt="house" />
          )}
        />
        <Column title="Location" dataIndex="codeLocation" key="codeLocation" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Price"
          dataIndex="price"
          key="price"
          render={(price) => <Tag color="green">{price.toLocaleString()} $</Tag>}
        />
      
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
           <div className='flex'>
           <Space size="middle" className='mr-3'>
            <AiOutlineEdit
              onClick={() => {
                
              }}
              className="text-[20px] hover:scale-125 hover:text-red-700 transition-all"
            />
          </Space>
            <Space size="middle">
              <AiOutlineDelete
                onClick={() => {
                  handleDelete(record);
                }}
                className="text-[20px] hover:scale-125 hover:text-red-700 transition-all"
              />
            </Space>
            </div>
          )}
        />
      </Table>

      <Modal
        title={`Xóa house ${selectedHouse?.name} ?`}
        visible={modalVisible}
        onOk={handleDeleteHouse}
        onCancel={() => setModalVisible(false)}
      ></Modal>
    </div>
  );
}
