package com.techpower.airbnb.converter;

import com.techpower.airbnb.dto.HouseDTO;
import com.techpower.airbnb.entity.HouseEntity;
import com.techpower.airbnb.entity.ImageRoomEntity;
import com.techpower.airbnb.entity.RoomEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HouseConverter {
    public HouseEntity toEntity(HouseDTO houseDTO) {
        return HouseEntity.builder()
                .name(houseDTO.getName())
                .description(houseDTO.getDescription())
                .price(houseDTO.getPrice())
                .washingMachine(houseDTO.isWashingMachine())
                .television(houseDTO.isTelevision())
                .airConditioner(houseDTO.isAirConditioner())
                .wifi(houseDTO.isWifi())
                .kitchen(houseDTO.isKitchen())
                .parking(houseDTO.isParking())
                .pool(houseDTO.isPool())
                .hotAndColdMachine(houseDTO.isHotAndColdMachine())
                .build();

    }

    public HouseEntity toEntity(HouseDTO houseDTO, HouseEntity houseEntity) {
        return houseEntity = HouseEntity.builder()
                .id(houseDTO.getId())
                .name(houseDTO.getName())
                .description(houseDTO.getDescription())
                .price(houseDTO.getPrice())
                .washingMachine(houseDTO.isWashingMachine())
                .television(houseDTO.isTelevision())
                .airConditioner(houseDTO.isAirConditioner())
                .wifi(houseDTO.isWifi())
                .kitchen(houseDTO.isKitchen())
                .parking(houseDTO.isParking())
                .pool(houseDTO.isPool())
                .hotAndColdMachine(houseDTO.isHotAndColdMachine())
                .build();

    }

    public HouseDTO toDTO(HouseEntity houseEntity) {
        List<String> images = new ArrayList<>();
        if (houseEntity.getImages() != null) {
            for (ImageRoomEntity image : houseEntity.getImages()) {
                images.add(image.getUrlImage());
            }
        }
        return HouseDTO.builder()
                .id(houseEntity.getId())
                .name(houseEntity.getName())
                .description(houseEntity.getDescription())
                .price(houseEntity.getPrice())
                .images(images)
                .codeLocation(houseEntity.getLocation().getName())
                .washingMachine(houseEntity.isWashingMachine())
                .television(houseEntity.isTelevision())
                .airConditioner(houseEntity.isAirConditioner())
                .wifi(houseEntity.isWifi())
                .kitchen(houseEntity.isKitchen())
                .parking(houseEntity.isParking())
                .pool(houseEntity.isPool())
                .hotAndColdMachine(houseEntity.isHotAndColdMachine())
                .build();

    }

    public List<HouseDTO> toDTOs(List<HouseEntity> houseEntities) {
        List<HouseDTO> houseDTOS = new ArrayList<>();
        for (HouseEntity house : houseEntities) {
            houseDTOS.add(toDTO(house));
        }
        return houseDTOS;
    }
}
