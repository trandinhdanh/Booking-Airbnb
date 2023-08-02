package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.ImageRoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRoomRepository extends JpaRepository<ImageRoomEntity, Long> {
    List<ImageRoomEntity> findAllByRoomId(long idRoom);

    void deleteAllByRoomId(long idRoom);
}
