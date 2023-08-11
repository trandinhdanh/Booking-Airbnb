package com.techpower.airbnb.service;


import com.techpower.airbnb.dto.FeedbackDTO;
import com.techpower.airbnb.response.RoomBookings;
import com.techpower.airbnb.constant.Status;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.dto.UserDTO;

import java.util.List;
import java.util.Map;

public interface IUserService {
    List<OrderDTO> findAllOrders(long idUser);

    List<RoomDTO> findAllRooms(long idUser);

    List<RoomBookings> findAllBookingsDate(Long idUser);

    List<OrderDTO> getAllOrdersByOwner(Long idUser);

    List<FeedbackDTO> getAllFeedbackByOwner(Long idUser);

    List<FeedbackDTO> findAllFeedbackByCustomer(Long idUser);

    UserDTO updateStatus(Status status, long idUser);

    Map<String, Object> getInformation(Long idUser);
    List<UserDTO> getAllCustomer();
    List<UserDTO> getAllOwner();
     UserDTO lock(long idUser,String status);

}
