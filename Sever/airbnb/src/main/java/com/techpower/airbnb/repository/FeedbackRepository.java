package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.FeedbackEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FeedbackRepository extends JpaRepository<FeedbackEntity, Long> {
    List<FeedbackEntity> findAllByOrderId(long idOrder);

    @Query("select f from FeedbackEntity f where f.order.room.id = ?1")
    List<FeedbackEntity> findByOrder_Room_Id(Long id);

    @Query("select f from FeedbackEntity f where f.order.user.id = ?1")
    List<FeedbackEntity> findByOrder_User_Id(Long id);

}
