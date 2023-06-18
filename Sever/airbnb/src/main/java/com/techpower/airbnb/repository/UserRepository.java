package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findOneById(long idUser);

    Optional<UserEntity> findByEmail(String email);
}
