import axios from 'axios';
import { https } from './axiosClient';
import { Content } from 'antd/es/layout/layout';

const getAuthConfig = () => ({
  headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzY29wZXMiOlsiT1dORVIiXSwic3ViIjoibmd1eWVuZ2lhbmdhMzIwMDFAZ21haWwuY29tIiwiaWF0IjoxNjg4NzQ1NzM4LCJleHAiOjE2ODg5MTg1Mzh9.3894ThHYlKQxc0J4gvv1iyT6VRrkSVrmwHwPW15U3rw`
  ,"Content-Type": 'multipart/form-data'
    }
});
export let roomService = {
  getHouseList: () => {
    return https.get(`/api/v1/rooms`);
  },
  getHouseById: (id) => {
    return https.get(`/api/v1/rooms/${id}`);
  },
  getRoomCalendar: (idRoom) => {
    return https.get(`/api/v1/rooms/calendar/${idRoom}`);
  },
  searchRoom: (data) => { 
    return https.post(`/api/v1/rooms/search`,data);
   },
  addRoom: (idUser,data) => {
    return https.post(`/api/v1/rooms/${idUser}`,data);
   }
};
