package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.OrderConverter;
import com.techpower.airbnb.converter.RoomConverter;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.repository.*;
import com.techpower.airbnb.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomConverter roomConverter;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderConverter orderConverter;
    @Override
    public List<OrderDTO> findAllOrders(long idUser) {
        return orderConverter.mapperTOList(orderRepository.findAllByUserId(idUser));
    }

    @Override
    public List<RoomDTO> findAllRooms(long idUser) {
        return roomConverter.toDTOs(roomRepository.findAllByUserId(idUser));
    }
}
