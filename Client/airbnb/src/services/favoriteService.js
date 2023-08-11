import { https } from './axiosClient';

export let favoriteService = {
  get: (idUser) => {
    return https.get(`/api/v1/wishlist/${idUser}`);
  },
  add: (idUser, data) => {
    return https.post(`/api/v1/wishlist/${idUser}/addWishlist`, data );
  },
  remove: (idUser, idRoom) => {
    return https.delete(`/api/v1/wishlist/${idUser}/delete?roomId=${idRoom}` );
  },
};
