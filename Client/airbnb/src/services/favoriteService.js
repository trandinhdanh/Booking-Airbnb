import { https } from './axiosClient';

export let favoryteService = {
  get: (idUser) => {
    return https.get(`/api/v1/wishlist/${idUser}`);
  },
  add: (idUser, data) => {
    return https.post(`/api/v1/wishlist/${idUser}/addWishlist`, data );
  },
};
