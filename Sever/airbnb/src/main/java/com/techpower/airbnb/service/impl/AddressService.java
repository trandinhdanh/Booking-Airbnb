package com.techpower.airbnb.service.impl;

import com.google.maps.model.LatLng;
import com.techpower.airbnb.converter.AddressConverter;
import com.techpower.airbnb.dto.AddressDTO;
import com.techpower.airbnb.entity.AddressEntity;
import com.techpower.airbnb.repository.AddressRepository;
import com.techpower.airbnb.service.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AddressService implements IAddressService {

    @Autowired
    private GeocodingService geocodingService;
    @Autowired
    private AddressConverter addressConverter;
    @Autowired
    private AddressRepository addressRepository;
    @Override
    public AddressDTO addAddress(String address) {
        try {
            // Lấy tọa độ từ địa chỉ
            AddressEntity addressEntity = new AddressEntity();
            LatLng latLng = geocodingService.getLatLngFromAddress(address);
            if (latLng == null) {
                addressEntity.setFullAddress(address);
                addressEntity.setLat(0);
                addressEntity.setLng(0);
                return addressConverter.apply(addressEntity);
            }
            // Lưu tọa độ vào đối tượng Address
            addressEntity.setFullAddress(address);
            addressEntity.setLat(latLng.lat);
            addressEntity.setLng(latLng.lng);
            // Lưu đối tượng Address vào cơ sở dữ liệu

            return addressConverter.apply(addressRepository.save(addressEntity));
        } catch (Exception e) {
            return new AddressDTO();
        }
    }
}
