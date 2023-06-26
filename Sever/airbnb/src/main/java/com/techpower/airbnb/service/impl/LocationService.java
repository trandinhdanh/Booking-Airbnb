package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.LocationConverter;
import com.techpower.airbnb.dto.LocationDTO;
import com.techpower.airbnb.repository.LocationRepository;
import com.techpower.airbnb.service.ILocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService implements ILocationService {
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private LocationConverter locationConverter;
    @Override
    public List<LocationDTO> getAllLocation() {
        return locationConverter.mapperList(locationRepository.findAll());
    }
}
