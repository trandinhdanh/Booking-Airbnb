package com.techpower.airbnb.converter;

import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.dto.FeedbackDTO;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.entity.FeedbackEntity;
import com.techpower.airbnb.entity.OrderEntity;
import com.techpower.airbnb.entity.RoomEntity;
import com.techpower.airbnb.entity.UserEntity;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class FeedbackConverter implements Function<FeedbackEntity, FeedbackDTO> {
    public FeedbackEntity mapperTOEntity(FeedbackDTO orderDTO, UserEntity userEntity, RoomEntity roomEntity) {
        return FeedbackEntity.builder()
                .user(userEntity)
                .room(roomEntity)
                .content(orderDTO.getContent())
                .numberOfStars(orderDTO.getNumberOfStars())
                .createDate(orderDTO.getCreateDate())
                .build();
    }

    @Override
    public FeedbackDTO apply(FeedbackEntity feedbackEntity) {
        return FeedbackDTO.builder()
                .id(feedbackEntity.getId())
                .content(feedbackEntity.getContent())
                .numberOfStars(feedbackEntity.getNumberOfStars())
                .createDate(feedbackEntity.getCreateDate())
                .idRoom(feedbackEntity.getRoom().getId())
                .idUserCreate(feedbackEntity.getUser().getId())
                .build();
    }
}
