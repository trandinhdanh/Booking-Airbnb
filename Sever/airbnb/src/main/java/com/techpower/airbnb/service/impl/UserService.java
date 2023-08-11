package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.constant.Role;
import com.techpower.airbnb.constant.Status;
import com.techpower.airbnb.converter.FeedbackConverter;
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

import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    private FeedbackConverter feedbackConverter;
    @Autowired
    private FeedbackRepository feedbackRepository;
    public List<OrderDTO> sortOrderListById(List<OrderDTO> orderList) {
        return orderList.stream()
                .sorted(Comparator.comparingLong(OrderDTO::getId).reversed())
                .collect(Collectors.toList());
    }
    @Override
    public List<OrderDTO> findAllOrders(long idUser) {
        List<OrderDTO> orderDTOS = orderConverter.mapperTOList(orderRepository.findAllByUserId(idUser));
//        Collections.reverse(orderDTOS);
        return sortOrderListById(orderDTOS);
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
        List<RoomDTO> roomDTOS = findAllRooms(idUser);
        List<FeedbackDTO> feedbackDTOS = new ArrayList<>();
        for (RoomDTO roomDTO : roomDTOS) {
            feedbackDTOS.addAll(roomService.findAllFeedbackByIDRoom(roomDTO.getId()));
        }
        return feedbackDTOS;
    }

    @Override
    public List<FeedbackDTO> findAllFeedbackByCustomer(Long idUser) {
        return feedbackConverter.mapperTOEntity(feedbackRepository.findByOrder_User_Id(idUser));
    }

    @Override
    public UserDTO updateStatus(Status status, long idUser) {
        UserEntity userEntity = userRepository.findOneById(idUser);
        userEntity.setStatus(status);
        return userDTOMapper.apply(userRepository.save(userEntity));
    }

    @Override
    public Map<String, Object> getInformation(Long idUser) {
        UserEntity userEntity = userRepository.findOneById(idUser);
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", idUser);
        userInfo.put("name", userEntity.getName());
        userInfo.put("email", userEntity.getEmail());
        userInfo.put("phone", userEntity.getPhone());
        userInfo.put("gender", userEntity.isGender());
        userInfo.put("birthday", userEntity.getBirthday());
        userInfo.put("status", userEntity.getStatus());
        userInfo.put("isConfirmed", userEntity.isConfirmed());

        return userInfo;
    }

    @Override
    public List<UserDTO> getAllCustomer() {
        List<UserEntity> userEntities = userRepository.findAllByRole(Role.CUSTOMER);
        List<UserDTO> userDTOS = new ArrayList<>();
        for (UserEntity user : userEntities) {
            userDTOS.add(userDTOMapper.apply(user));
        }
        return userDTOS;
    }

    @Override
    public List<UserDTO> getAllOwner() {
        List<UserEntity> userEntities = userRepository.findAllByRole(Role.OWNER);
        List<UserDTO> userDTOS = new ArrayList<>();
        for (UserEntity user : userEntities) {
            userDTOS.add(userDTOMapper.apply(user));
        }
        return userDTOS;
    }

    @Override
    public UserDTO lock(long idUser, String status) {
        UserEntity userEntity = userRepository.findOneById(idUser);
        if (userEntity != null) {
            if (status.equalsIgnoreCase("ACTIVE")) {
                userEntity.setStatus(Status.ACTIVE);
            }
            if (status.equalsIgnoreCase("INACTIVE")) {
                userEntity.setStatus(Status.INACTIVE);
            }
            return userDTOMapper.apply(userRepository.save(userEntity));
        } else
            return null;
    }

}
