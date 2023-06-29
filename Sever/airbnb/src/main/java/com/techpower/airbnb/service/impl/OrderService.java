package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.converter.OrderConverter;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.entity.OrderEntity;
import com.techpower.airbnb.entity.RoomEntity;
import com.techpower.airbnb.repository.OrderRepository;
import com.techpower.airbnb.repository.RoomRepository;
import com.techpower.airbnb.repository.UserRepository;
import com.techpower.airbnb.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

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
    public OrderDTO createOrder(OrderDTO orderDTO, long idRoom) {
        if (orderDTO.getNumGuests() > roomRepository.findOneById(idRoom).getMaxGuests()) {
            return null;
        }
        orderDTO.setStatus(Order.BOOKED.toString());
        int numDate = countDate(orderDTO.getReceivedDate(), orderDTO.getCheckoutDate());
        RoomEntity roomEntity = roomRepository.findOneById(idRoom);
        double totalPrice = numDate * roomEntity.getPrice();
        OrderEntity orderEntity = orderConverter.mapperTOEntity(orderDTO,
                userRepository.findOneById(orderDTO.getIdUser()),
                roomEntity);
        orderEntity.setTotalPrice(totalPrice);
        return orderConverter.apply(orderRepository.save(orderEntity));
    }

    private int countDate(LocalDate start, LocalDate end) {
        long daysBetween = ChronoUnit.DAYS.between(start, end);
        return Math.abs((int) daysBetween);
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
