package com.techpower.airbnb.converter;

import com.techpower.airbnb.dto.LocationDTO;
import com.techpower.airbnb.entity.LocationEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;
@Component
public class LocationConverter implements Function<LocationEntity, LocationDTO> {
    @Override
    public LocationDTO apply(LocationEntity locationEntity) {
        return new LocationDTO(locationEntity.getId(),locationEntity.getCode(),locationEntity.getName());
    }

    public List<LocationDTO> mapperList(List<LocationEntity> locationEntities){
        return locationEntities.stream().map(this::apply).toList();
    }
}
