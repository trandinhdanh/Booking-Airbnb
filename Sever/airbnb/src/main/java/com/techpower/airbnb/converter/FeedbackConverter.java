package com.techpower.airbnb.converter;

import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.dto.FeedbackDTO;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.entity.FeedbackEntity;
import com.techpower.airbnb.entity.OrderEntity;
import com.techpower.airbnb.entity.RoomEntity;
import com.techpower.airbnb.entity.UserEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;

@Component
public class FeedbackConverter implements Function<FeedbackEntity, FeedbackDTO> {
    public FeedbackEntity mapperTOEntity(FeedbackDTO feedbackDTO, UserEntity userEntity, OrderEntity orderEntity) {
        return FeedbackEntity.builder()
                .user(userEntity)
                .order(orderEntity)
                .content(feedbackDTO.getContent())
                .numberOfStars(feedbackDTO.getNumberOfStars())
                .createDate(feedbackDTO.getCreateDate())
                .build();
    }

    @Override
    public FeedbackDTO apply(FeedbackEntity feedbackEntity) {
        return FeedbackDTO.builder()
                .id(feedbackEntity.getId())
                .content(feedbackEntity.getContent())
                .numberOfStars(feedbackEntity.getNumberOfStars())
                .createDate(feedbackEntity.getCreateDate())
                .idOrder(feedbackEntity.getOrder().getId())
                .idUserCreate(feedbackEntity.getUser().getId())
                .nameUser(feedbackEntity.getUser().getName())
                .nameRoom(feedbackEntity.getOrder().getRoom().getName())
                .build();
    }

    public List<FeedbackDTO> mapperTOEntity(List<FeedbackEntity> feedbackEntities){
        return feedbackEntities.stream().map(this::apply).toList();
    }
}
