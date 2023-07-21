import axios from "axios";
import { message } from "antd";
import { https } from "./axiosClient";

export let blogService = {
  getAllBlog: () => {
    return https.get(`/api/v1/blogs`);
  },
  getBlogById: (id) => {
    return https.get(`/api/v1/blogs/${id}`);
  },
  create: (iduser,data) => {
    return https.post(`/api/v1/blogs/${iduser}`,data);
  },
  update: (id,data) => {
    return https.put(`/api/v1/blogs/${id}`,data);
  },
  delete: (id) => {
    return https.delete(`/api/v1/blogs/${id}`);
  },
  // getAllBlog: async () => {
  //   try {
  //       const response = await axios.get(BASE_URL + "/api/v1/blogs");
  //       return response.data
  //   } catch (error) {
  //       console.log(error);      
  //   }
  // },
  // getBlogById: async (id) => { 
  //   try {
  //     const response = await axios.get(BASE_URL + `/api/v1/blogs/${id}`);
  //     console.log(response);
  //     return response.data
  // } catch (error) {
  //     console.log(error);      
  // }
  // },
  // getBlogByShop: async (id) => { 
  //   try {
  //     const response = await axios.get(BASE_URL + `/api/v1/blogs/${id}/owner`);
  //     return response.data
  // } catch (error) {
  //     console.log(error);      
  // }
  // },
  // delete: async (id) => {
  //   console.log(id);
  //   try {
  //     const response = await axios.delete(BASE_URL + `/api/v1/blogs/${id}`, {
  //       ...getAuthConfig(),
  //     });
  //     message.success("Delete Blog Success")
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //       message.error("Delete Blog Fail")
  //   }
  // },

  // create: async (idUser,values) => {
  //   try {
  //     const response = await axios.post(BASE_URL + `/api/v1/blogs/${idUser}`,values,{
  //       ...getAuthConfig(),
  //       'Content-Type': 'multipart/form-data'
  //     })
  //     message.success("Create Blogs Success")
  //     console.log(response);
  //   } catch (error) {
  //     message.error("Create Blogs Error")
  //     console.log(error);
  //   }
  // },
  // update: async (id,values) => {
  //   try {
  //     const response = await axios.put(BASE_URL + `/api/v1/blogs/${id}`,values,{
  //       ...getAuthConfig(),
  //       'Content-Type': 'multipart/form-data'
  //     })
  //     message.success("Update Blogs Success")
  //     console.log(response);
  //   } catch (error) {
  //     message.error("Update Blogs Error")
  //     console.log(error);
  //   }
  // },


};
