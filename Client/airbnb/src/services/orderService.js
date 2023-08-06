import { https } from './axiosClient';

export let orderService = {
  order: (idRoom,data) => {
    return https.post(`/api/v1/orders/${idRoom}`, data);
  },

  update: (idOrder,data) => {
    return https.put(`/api/v1/orders/${idOrder}?status=${data}`,);
  },
};
