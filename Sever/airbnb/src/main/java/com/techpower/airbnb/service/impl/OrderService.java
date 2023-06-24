package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.OrderConverter;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.entity.OrderEntity;
import com.techpower.airbnb.repository.OrderRepository;
import com.techpower.airbnb.repository.RoomRepository;
import com.techpower.airbnb.repository.UserRepository;
import com.techpower.airbnb.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderConverter orderConverter;

    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) {
        OrderEntity orderEntity = orderRepository.save(
                orderConverter.mapperTOEntity(orderDTO,
                userRepository.findOneById(orderDTO.getIdUser()),
                roomRepository.findOneById(orderDTO.getIdRoom())));
        return orderConverter.apply(orderEntity);
    }
}
