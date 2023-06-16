package com.techpower.airbnb.repository;

import com.techpower.airbnb.entity.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, Long> {
    LocationEntity findOneByCode(String code);
}
