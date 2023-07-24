import axios from "axios";
import { https } from "./axiosClient";
import { Content } from "antd/es/layout/layout";

export let roomService = {
  getHouseList: () => {
    return https.get(`/api/v1/rooms`);
  },
  getHouseById: (id) => {
    return https.get(`/api/v1/rooms/${id}`);
  },
  getRoomCalendar: (idRoom) => {
    return https.get(`/api/v1/rooms/${idRoom}/calendar`);
  },
  searchRoom: (data) => {
    return https.post(`/api/v1/rooms/search`, data);
  },
  addRoom: (idUser, data) => {
    return https.post(`/api/v1/rooms/${idUser}`, data);
  },
  update: (idRoom, data) => {
    return https.put(`/api/v1/rooms/${idRoom}`, data);
  },
  getFeedBackByRoom: (idRoom, data) => {
    return https.get(`/api/v1/rooms/${idRoom}/feedback`);
  },
  delete: (idRoom) => {
    return https.delete(`/api/v1/rooms/${idRoom}`);
  },
};
