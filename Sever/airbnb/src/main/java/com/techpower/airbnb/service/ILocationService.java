package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.LocationDTO;
import com.techpower.airbnb.entity.LocationEntity;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ILocationService {
    List<LocationDTO> getAllLocation();

}
