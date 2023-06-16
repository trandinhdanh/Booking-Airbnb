package com.techpower.airbnb.converter;

import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.entity.ImageRoomEntity;
import com.techpower.airbnb.entity.RoomEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RoomConverter {
    public RoomEntity toEntity(RoomDTO roomDTO) {
        return RoomEntity.builder()
                .name(roomDTO.getName())
                .description(roomDTO.getDescription())
                .price(roomDTO.getPrice())
                .washingMachine(roomDTO.isWashingMachine())
                .television(roomDTO.isTelevision())
                .airConditioner(roomDTO.isAirConditioner())
                .wifi(roomDTO.isWifi())
                .kitchen(roomDTO.isKitchen())
                .parking(roomDTO.isParking())
                .pool(roomDTO.isPool())
                .hotAndColdMachine(roomDTO.isHotAndColdMachine())
                .build();

    }

    public RoomEntity toEntity(RoomDTO roomDTO, RoomEntity roomEntity) {
        return roomEntity = RoomEntity.builder()
                .id(roomDTO.getId())
                .name(roomDTO.getName())
                .description(roomDTO.getDescription())
                .price(roomDTO.getPrice())
                .washingMachine(roomDTO.isWashingMachine())
                .television(roomDTO.isTelevision())
                .airConditioner(roomDTO.isAirConditioner())
                .wifi(roomDTO.isWifi())
                .kitchen(roomDTO.isKitchen())
                .parking(roomDTO.isParking())
                .pool(roomDTO.isPool())
                .hotAndColdMachine(roomDTO.isHotAndColdMachine())
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
                .codeLocation(roomEntity.getLocation().getName())
                .washingMachine(roomEntity.isWashingMachine())
                .television(roomEntity.isTelevision())
                .airConditioner(roomEntity.isAirConditioner())
                .wifi(roomEntity.isWifi())
                .kitchen(roomEntity.isKitchen())
                .parking(roomEntity.isParking())
                .pool(roomEntity.isPool())
                .hotAndColdMachine(roomEntity.isHotAndColdMachine())
                .build();

    }

    public List<RoomDTO> toDTOs(List<RoomEntity> roomEntities) {
        List<RoomDTO> roomDTOS = new ArrayList<>();
        for (RoomEntity roomEntity : roomEntities) {
            roomDTOS.add(toDTO(roomEntity));
        }
        return roomDTOS;
    }
}
