package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findAllByRoomId(Long id);
}