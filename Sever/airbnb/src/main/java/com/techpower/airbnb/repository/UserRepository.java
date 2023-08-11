package com.techpower.airbnb.repository;

import com.techpower.airbnb.constant.Role;
import com.techpower.airbnb.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findOneById(long idUser);

    List<UserEntity> findAllByRole(Role role);

    UserEntity findOneByEmail(String email);

    Optional<UserEntity> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("update UserEntity u set u.confirmed = ?1 where u.email = ?2 and u.codeConfirmed = ?3")
    void updateConfirmedByEmailAndCodeConfirmed(boolean confirmed, String email, String codeConfirmed);

    void deleteByEmail(String email);

}
