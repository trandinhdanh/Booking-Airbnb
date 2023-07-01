package com.techpower.airbnb.converter;

import com.techpower.airbnb.dto.AddressDTO;
import com.techpower.airbnb.entity.AddressEntity;
import org.springframework.stereotype.Component;

import java.util.function.Function;
@Component
public class AddressConverter implements Function<AddressEntity, AddressDTO> {
    @Override
    public AddressDTO apply(AddressEntity addressEntity) {
        return AddressDTO.builder()
                .fullAddress(addressEntity.getFullAddress())
                .lat(addressEntity.getLat())
                .lng(addressEntity.getLng())
                .build();
    }

    public AddressEntity toEntity(AddressDTO addressDTO) {
        return AddressEntity.builder()
                .fullAddress(addressDTO.getFullAddress())
                .lat(addressDTO.getLat())
                .lng(addressDTO.getLng())
                .build();
    }
}
