package com.techpower.airbnb.converter;

import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.entity.OrderEntity;
import com.techpower.airbnb.entity.RoomEntity;
import com.techpower.airbnb.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;
@Component
public class OrderConverter implements Function<OrderEntity, OrderDTO> {
    @Autowired
    private RoomConverter roomConverter;
    @Override
    public OrderDTO apply(OrderEntity orderEntity) {
        return OrderDTO.builder()
                .id(orderEntity.getId())
                .idUser(orderEntity.getUser().getId())
                .roomDTO(roomConverter.toDTO(orderEntity.getRoom()))
                .status(orderEntity.getStatus().toString())
                .receivedDate(orderEntity.getReceivedDate().minusDays(1))
                .checkoutDate(orderEntity.getCheckoutDate().minusDays(1))
                .numGuests(orderEntity.getNumGuests())
                .totalPrice(orderEntity.getTotalPrice())
                .build();
    }

    public List<OrderDTO> mapperTOList(List<OrderEntity> orderEntities) {
        return orderEntities.stream().map(this::apply).toList();
    }

    public OrderEntity mapperTOEntity(OrderDTO orderDTO, UserEntity userEntity, RoomEntity roomEntity) {
        return OrderEntity.builder()
                .user(userEntity)
                .room(roomEntity)
                .status(Order.valueOf(orderDTO.getStatus()))
                .receivedDate(orderDTO.getReceivedDate().plusDays(1))
                .checkoutDate(orderDTO.getCheckoutDate().plusDays(1))
                .numGuests(orderDTO.getNumGuests())
                .build();
    }
}
