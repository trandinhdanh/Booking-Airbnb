package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.FeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity, Long> {
    List<FeedbackEntity> findAllByRoomId(long idRoom);
}
