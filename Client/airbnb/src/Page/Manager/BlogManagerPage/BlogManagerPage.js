import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Pagination, Modal } from 'antd';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { blogService } from '../../../services/blogService';
import { useNavigate } from 'react-router-dom';
import { localStorageService } from '../../../services/localStorageService';

export default function BlogManagerPage() {
  const { Column } = Table;
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(3); // state để lưu số bài viết trên 1 trang
  const [idBlog, setIdBlog] = useState();
  const [blogs, setBlogs] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);
  
  useEffect(() => {
    // const id = localStorageService.get('USER').userDTO.id;
    const getBlogsShop = async () => {
      try {
        const items = await blogService.getAllBlog();
        setBlogs(items.data);
        console.log(items);
      } catch (error) {
        console.log(error);
      }
    };
    getBlogsShop();
  }, [reloadPage]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleDelete = (record) => {
    const id = record.id;
    setIdBlog(id);
    setSelectedBlog(record);
    setModalVisible(true);
  };
  
  const handleDeleteBlog = async () => {
    console.log(idBlog);
    try {
      await blogService.delete(idBlog);
      console.log('Blogs deleted successfully');
      setReloadPage(!reloadPage);
      // Xử lý khi xóa bài viết thành công
    } catch (error) {
      console.error('Failed to delete blogs:', error);
      // Xử lý khi có lỗi xóa bài viết
    }
    setModalVisible(false);
  };
  
  return (
    <div className='w-full'>
      <div className="headerManager font-roboto mb-5 flex justify-between">
        <h1 className="font-bold text-[20px] uppercase ">
          Blog Management
        </h1>
        <button
          onClick={() => navigate('/manager/blog-add')}
          className="text-white bg-primary font-medium rounded-lg text-sm px-4 py-2 flex items-center hover:scale-110 transition-all"
        >
          Add <IoIosAddCircleOutline className='ml-2 text-[20px]'/> 
        </button>
      </div>
      <Table 
         dataSource={blogs} 
        pagination={{
          total: blogs?.length,
          pageSize: pageSize,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      >
        <Column title="ID" dataIndex="id" key="id" />
        <Column
          title="Image"
          dataIndex="image"
          key="image"
          render={(image) => (
            <img src={image} alt="Product Image"  className='w-[70px] h-[70px] object-cover rounded-lg'/>
          )}
        />
        <Column title="Title" dataIndex="title" key="title" />
     
        <Column
          title="Short Description"
          dataIndex="shortDescription"
          key="shortDescription"
          render={(shortDescription) => (
            <div className="blog-shortDescription">{shortDescription}</div>
          )}
        />
        
        <Column
          title=""
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <AiOutlineEdit
                onClick={() => navigate(`/manager/blog-update/${record.id}`)}
                className=' text-[20px] hover:scale-125 transition-all'
              />
              <AiOutlineDelete
                onClick={() => handleDelete(record)}
                className='text-[20px] hover:scale-125 hover:text-red-700 transition-all'
              />
            </Space>
          )}
        />
      </Table>
      
      <Modal
        title={`Delete Blog: ${selectedBlog?.title}`}
        visible={modalVisible}
        onOk={handleDeleteBlog}
        onCancel={() => setModalVisible(false)}
      ></Modal>
    </div>
  );
}
