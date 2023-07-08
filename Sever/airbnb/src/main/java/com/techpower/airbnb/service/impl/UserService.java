package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.constant.Status;
import com.techpower.airbnb.converter.OrderConverter;
import com.techpower.airbnb.converter.RoomConverter;

import com.techpower.airbnb.dto.FeedbackDTO;
import com.techpower.airbnb.entity.RoomEntity;
import com.techpower.airbnb.converter.UserDTOMapper;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.dto.UserDTO;
import com.techpower.airbnb.entity.UserEntity;
import com.techpower.airbnb.repository.*;
import com.techpower.airbnb.response.RoomBookings;
import com.techpower.airbnb.service.IRoomService;
import com.techpower.airbnb.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @Autowired
    private IRoomService roomService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserDTOMapper userDTOMapper;


    @Override
    public List<OrderDTO> findAllOrders(long idUser) {
        return orderConverter.mapperTOList(orderRepository.findAllByUserId(idUser));
    }

    @Override
    public List<RoomDTO> findAllRooms(long idUser) {
        return roomConverter.toDTOs(roomRepository.findAllByUserId(idUser));
    }

    @Override
    public List<RoomBookings> findAllBookingsDate(Long idUser) {
        List<RoomDTO> roomDTOS = findAllRooms(idUser);
        List<RoomBookings> roomBookings = new ArrayList<>();
        for (RoomDTO roomDTO : roomDTOS) {
            roomBookings.add(new RoomBookings(roomDTO.getName(), roomService.checkDateOfRoom(roomDTO.getId())));
        }
        return roomBookings;
    }

    @Override
    public List<OrderDTO> getAllOrdersByOwner(Long idUser) {
        List<OrderDTO> orderDTOS = new ArrayList<>();
        for (RoomDTO roomDTO : findAllRooms(idUser)) {
            orderDTOS.addAll(orderConverter.mapperTOList(orderRepository.findAllByRoomId(roomDTO.getId())));
        }
        return orderDTOS;
    }

    @Override
    public List<FeedbackDTO> getAllFeedbackByOwner(Long idUser) {

        return null;
    }

    @Override
    public List<FeedbackDTO> findAllFeedback(Long idUser) {
        return null;

    @Override
    public UserDTO updateStatus(Status status, long idUser) {
        UserEntity userEntity = userRepository.findOneById(idUser);
        userEntity.setStatus(status);
        return userDTOMapper.apply(userRepository.save(userEntity));
    }
}
