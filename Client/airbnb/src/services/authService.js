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
        openNotificationIcon('success', 'Success', 'Resgister Success!');
        return response.data
    } catch (error) {
      openNotificationIcon('error', 'Error', 'Resgister Error!');
        console.log(error)  
    }
  },
};
