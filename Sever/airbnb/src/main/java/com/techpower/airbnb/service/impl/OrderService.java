package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.constant.Order;
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
        orderDTO.setStatus(Order.BOOKED.toString());
        OrderEntity orderEntity = orderRepository.save(
                orderConverter.mapperTOEntity(orderDTO,
                        userRepository.findOneById(orderDTO.getIdUser()),
                        roomRepository.findOneById(orderDTO.getRoomDTO().getId())));
        return orderConverter.apply(orderEntity);
    }

    @Override
    public OrderDTO updateStatus(Order orderStatus, long idOrder) {
        OrderEntity orderEntity = orderRepository.findOneById(idOrder);
        switch (orderStatus) {
            case CANCEL:
                if (orderEntity.getStatus().equals(Order.BOOKED)) {
                    orderEntity.setStatus(orderStatus);
                }
                break;
            case CONFIRM:
                if (orderEntity.getStatus().equals(Order.BOOKED)) {
                    orderEntity.setStatus(orderStatus);
                }
                break;
            case CHECKED_IN:
                if (orderEntity.getStatus().equals(Order.CONFIRM)) {
                    orderEntity.setStatus(orderStatus);
                }
                break;
            case CHECKED_OUT:
                if (orderEntity.getStatus().equals(Order.CHECKED_IN)) {
                    orderEntity.setStatus(orderStatus);
                }
                break;
            default:
                break;
        }
        return orderConverter.apply(orderRepository.save(orderEntity));
    }
}
