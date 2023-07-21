import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { blogService } from '../../../../services/blogService';
import { useDispatch } from 'react-redux';
import { localStorageService } from '../../../../services/localStorageService';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateBlogManagerPage() {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [shortDescription, setShortDescription] = useState('');
  const [user,setUser] = useState(localStorageService.get("USER"))
  const [blog,setBlog] = useState({})
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const response = await blogService.getBlogById(id);
        setBlog(response.data);
        console.log("detail", response);
        form.setFieldsValue({
          title: response.data.title,
          content: response.data.content,
          shortDescription: response.data.shortDescription,
          
        });
        setSelectedImage(response.image);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailProduct()
  }, []);
  const onFinish = (values) => {
    console.log('Form submitted:', values);
  
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('image', selectedImage);
    formData.append('content', content);
    formData.append('shortDescription', values.shortDescription);
      blogService.update(id,formData)
    .then((res) => {
    form.resetFields()
    console.log(res);
    navigate("/manager/blog")
  })
  .catch((err) => {
        console.log(err);
      });
    
   
  };

  const handleChangeContent = (value) => {
    console.log(value);
    setContent(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedImage(file);
  };

  const labelCol = { span: 4 };
  const wrapperCol = { span: 16 };

  return (
    <div className='w-full'>
      <h1 className='uppercase font-bold text-primary text-[20px] text-center my-5'>update blog</h1>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Title Blog"
          name="title"
          rules={[{ required: true, message: 'Please enter the title of the blog' }]}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Short Description"
          name="shortDescription"
          rules={[
            { required: true, message: 'Please enter the short description' },
            { max: 100, message: 'Short description must be less than 100 characters' },
          ]}
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Hình ảnh"
          name="image"
          labelCol={labelCol}
          wrapperCol={wrapperCol}
          rules={[
            () => ({
              validator(_, value) {
                if (selectedImage || value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Vui lòng chọn hình ảnh'));
              },
            }),
          ]}
        >
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="content"
          labelCol={labelCol}
          wrapperCol={wrapperCol}
        >
          <ReactQuill value={content} onChange={handleChangeContent} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: labelCol.span, span: wrapperCol.span }}>
          <Button type="primary" htmlType="submit">
          Update Blog
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
