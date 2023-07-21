package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.BlogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {
    BlogEntity findOneById(Long id);

    List<BlogEntity> findAllByUserId(Long idUser);
}
