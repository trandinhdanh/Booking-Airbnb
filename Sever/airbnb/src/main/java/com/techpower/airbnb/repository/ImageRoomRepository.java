package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.ImageRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRoomRepository extends JpaRepository<ImageRoomEntity, Long> {
}
