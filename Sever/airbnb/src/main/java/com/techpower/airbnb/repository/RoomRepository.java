package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.OrderEntity;
import com.techpower.airbnb.entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Long> {
    RoomEntity findOneById(long id);

    List<RoomEntity> findAllByUserId(Long id);

    @Query("select r from RoomEntity r where r.location.id = ?1")
    List<RoomEntity> findByLocation_Id(Long id);


}
