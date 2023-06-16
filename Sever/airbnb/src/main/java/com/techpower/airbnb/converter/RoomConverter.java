package com.techpower.airbnb.converter;

import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.entity.ImageRoomEntity;
import com.techpower.airbnb.entity.RoomEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RoomConverter {
    public RoomDTO toDTO(RoomEntity roomEntity) {
        List<String> images = new ArrayList<>();
        if (roomEntity.getImages() != null) {
            for (ImageRoomEntity image : roomEntity.getImages()) {
                images.add(image.getUrlImage());
            }
        }
        RoomDTO roomDTO = RoomDTO.builder()
                .id(roomEntity.getId())
                .name(roomEntity.getName())
                .description(roomEntity.getDescription())
                .price(roomEntity.getPrice())
                .images(images)
                .washingMachine(roomEntity.isWashingMachine())
                .television(roomEntity.isTelevision())
                .airConditioner(roomEntity.isAirConditioner())
                .wifi(roomEntity.isWifi())
                .kitchen(roomEntity.isKitchen())
                .parking(roomEntity.isParking())
                .pool(roomEntity.isPool())
                .hotAndColdMachine(roomEntity.isHotAndColdMachine())
                .build();
        return roomDTO;
    }

    public List<RoomDTO> toDTOs(List<RoomEntity> roomEntities) {
        List<RoomDTO> roomDTOS = new ArrayList<>();
        for (RoomEntity roomEntity : roomEntities) {
            roomDTOS.add(toDTO(roomEntity));
        }
        return roomDTOS;
    }
}
