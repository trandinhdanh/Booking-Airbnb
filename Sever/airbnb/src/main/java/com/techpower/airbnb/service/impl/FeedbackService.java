package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.FeedbackConverter;
import com.techpower.airbnb.dto.FeedbackDTO;
import com.techpower.airbnb.entity.FeedbackEntity;
import com.techpower.airbnb.entity.OrderEntity;
import com.techpower.airbnb.repository.FeedbackRepository;
import com.techpower.airbnb.repository.OrderRepository;
import com.techpower.airbnb.repository.RoomRepository;
import com.techpower.airbnb.repository.UserRepository;
import com.techpower.airbnb.service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class FeedbackService implements IFeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private FeedbackConverter feedbackConverter;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;
@Autowired
private OrderRepository orderRepository;

    @Override
    public FeedbackDTO post(FeedbackDTO dto) {
        dto.setCreateDate(LocalDate.now());
        FeedbackEntity feedbackEntity = feedbackConverter.mapperTOEntity(
                dto,
                userRepository.findOneById(dto.getIdUserCreate()),
                orderRepository.findOneById(dto.getIdOrder()) );
        return feedbackConverter.apply(feedbackRepository.save(feedbackEntity));
    }

    @Override
    public boolean remove(long idFeedback) {
        if (feedbackRepository.existsById(idFeedback)){
            feedbackRepository.deleteById(idFeedback);
            return true;
        }
        return false;
    }
}
