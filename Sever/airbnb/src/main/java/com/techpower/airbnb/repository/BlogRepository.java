package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.BlogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<BlogEntity, Long> {

}
