package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.WishlistEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<WishlistEntity, Long> {
    List<WishlistEntity> findAllByUserId(Long id);

    void deleteByUser_IdAndRoom_Id(Long idUser, Long idRoom);

}
