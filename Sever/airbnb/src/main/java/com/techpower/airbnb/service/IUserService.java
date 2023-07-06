package com.techpower.airbnb.service;

import com.techpower.airbnb.constant.Status;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.dto.UserDTO;

import java.util.List;

public interface IUserService {
    List<OrderDTO> findAllOrders(long idUser);

    List<RoomDTO> findAllRooms(long idUser);

    UserDTO updateStatus(Status status, long idUser);
}
