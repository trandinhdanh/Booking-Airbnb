import { message } from "antd";
import axios from "axios";
import { openNotificationIcon } from "../Components/NotificationIcon/NotificationIcon";
import { https } from "./axiosClient";

export let authService = {
  registerSeller: async (values) => {
    try {
        const response = await https.post(`/api/v1/auth/register/s`,values);
        openNotificationIcon('success', 'Success', 'Resgister Success!');
        return response.data
    } catch (error) {
      openNotificationIcon('error', 'Error', 'Resgister Error!');
      console.log(error)   
    }
  },
  registerUser: async (values) => {
    try {
        const response = await https.post(`/api/v1/auth/register-customer`,values);
        // openNotificationIcon('success', 'Success', 'Resgister Success!');
        return response.data
    } catch (error) {
      openNotificationIcon('error', 'Error', 'Resgister Error!');
        console.log(error)  
    }
  },
  confirm: async (values) => {
        const response = await https.put(`/api/v1/auth/confirm`,values);
        return response.data
  }, 
  delete: async (values) => {
    const response = await https.delete(`/api/v1/auth/delete/${values}`);
    return response.data
},
};
