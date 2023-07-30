import { https } from './axiosClient';

export let userService = {
  getOrder: (idUser) => {
    return https.get(`/api/v1/users/${idUser}/orders`);
  },
  getOrderByOwner: (idUser) => {
    return https.get(`/api/v1/users/${idUser}/manager-orders`);
  },
  getOwnersRoom: (idUser) => {
    return https.get(`/api/v1/users/${idUser}/rooms`);
  },
  getDateBooking: (idUser) => {
    return https.get(`/api/v1/users/${idUser}/bookings-date`);
  },
  getFeedBack: (idUser) => {
    return https.get(`/api/v1/users/${idUser}/feedback`);
  },
  getAllFeedbackByOwner: (idUser) => {
    return https.get(`/api/v1/users/${idUser}/manager-feedback`);
  }
};
