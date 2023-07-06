import axios from 'axios';
import { https } from './axiosClient';

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
   },
   create: async (idUser,values) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/rooms/${idUser}`,values,{
        'Content-Type': 'multipart/form-data'
      })
      console.log(response);
    } catch (error) {
      console.log("ẹuygfjhgfhj",error);
    }
  },
};
