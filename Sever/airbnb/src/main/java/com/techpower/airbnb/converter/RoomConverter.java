package com.techpower.airbnb.converter;

import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.entity.ImageRoomEntity;
import com.techpower.airbnb.entity.RoomEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RoomConverter {
    @Autowired
    private AddressConverter addressConverter;

    public RoomEntity toEntity(RoomDTO roomDTO) {
        return RoomEntity.builder()
                .name(roomDTO.getName())
                .description(roomDTO.getDescription())
                .price(roomDTO.getPrice())
                .address(addressConverter.toEntity(roomDTO.getAddress()))
                .washingMachine(roomDTO.isWashingMachine())
                .television(roomDTO.isTelevision())
                .airConditioner(roomDTO.isAirConditioner())
                .wifi(roomDTO.isWifi())
                .kitchen(roomDTO.isKitchen())
                .parking(roomDTO.isParking())
                .pool(roomDTO.isPool())
                .hotAndColdMachine(roomDTO.isHotAndColdMachine())
                .maxGuests(roomDTO.getMaxGuests())
                .numLivingRooms(roomDTO.getNumLivingRooms())
                .numBathrooms(roomDTO.getNumBathrooms())
                .numBedrooms(roomDTO.getNumBedrooms())
                .build();

    }

    public RoomDTO toDTO(RoomEntity roomEntity) {
        List<String> images = new ArrayList<>();
        if (roomEntity.getImages() != null) {
            for (ImageRoomEntity image : roomEntity.getImages()) {
                images.add(image.getUrlImage());
            }
        }
        return RoomDTO.builder()
                .id(roomEntity.getId())
                .name(roomEntity.getName())
                .description(roomEntity.getDescription())
                .price(roomEntity.getPrice())
                .images(images)
                .address(addressConverter.apply(roomEntity.getAddress()))
                .codeLocation(roomEntity.getLocation().getName())
                .washingMachine(roomEntity.isWashingMachine())
                .television(roomEntity.isTelevision())
                .airConditioner(roomEntity.isAirConditioner())
                .wifi(roomEntity.isWifi())
                .kitchen(roomEntity.isKitchen())
                .parking(roomEntity.isParking())
                .pool(roomEntity.isPool())
                .hotAndColdMachine(roomEntity.isHotAndColdMachine())
                .maxGuests(roomEntity.getMaxGuests())
                .numLivingRooms(roomEntity.getNumLivingRooms())
                .numBedrooms(roomEntity.getNumBedrooms())
                .numBathrooms(roomEntity.getNumBathrooms())
                .available(true)
                .build();

    }

    public List<RoomDTO> toDTOs(List<RoomEntity> roomEntities) {
        List<RoomDTO> roomDTOS = new ArrayList<>();
        for (RoomEntity roomEntity : roomEntities) {
            roomDTOS.add(toDTO(roomEntity));
        }
        return roomDTOS;
    }

    public RoomEntity toEntity(RoomDTO dto, RoomEntity entity) {
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        entity.setWashingMachine(dto.isWashingMachine());
        entity.setTelevision(dto.isTelevision());
        entity.setAirConditioner(dto.isAirConditioner());
        entity.setWifi(dto.isWifi());
        entity.setKitchen(dto.isKitchen());
        entity.setParking(dto.isParking());
        entity.setPool(dto.isPool());
        entity.setHotAndColdMachine(dto.isHotAndColdMachine());
        return entity;
    }
}
