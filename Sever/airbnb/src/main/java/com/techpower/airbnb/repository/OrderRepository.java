package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findAllByRoomId(Long id);
    List<OrderEntity> findAllByUserId(Long id);
    OrderEntity findOneById(long id);

}