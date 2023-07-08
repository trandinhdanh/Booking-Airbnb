package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.FeedbackDTO;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.response.RoomBookings;

import java.util.List;

public interface IUserService {
    List<OrderDTO> findAllOrders(long idUser);

    List<RoomDTO> findAllRooms(long idUser);

    List<RoomBookings> findAllBookingsDate(Long idUser);

    List<OrderDTO> getAllOrdersByOwner(Long idUser);

    List<FeedbackDTO> getAllFeedbackByOwner(Long idUser);

    List<FeedbackDTO> findAllFeedback(Long idUser);
}
