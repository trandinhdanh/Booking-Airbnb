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
   }
};
