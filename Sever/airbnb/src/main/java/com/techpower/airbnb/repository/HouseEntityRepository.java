package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.HouseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseEntityRepository extends JpaRepository<HouseEntity, Long> {
    HouseEntity findHouseEntityById(Long id);
}