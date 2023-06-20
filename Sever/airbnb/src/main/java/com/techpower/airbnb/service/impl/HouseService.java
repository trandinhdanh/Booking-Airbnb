package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.HouseConverter;
import com.techpower.airbnb.dto.HouseDTO;
import com.techpower.airbnb.entity.HouseEntity;
import com.techpower.airbnb.entity.RoomEntity;
import com.techpower.airbnb.repository.*;
import com.techpower.airbnb.service.IHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HouseService implements IHouseService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private HouseEntityRepository houseEntityRepository;
    @Autowired
    private HouseConverter houseConverter;
    @Autowired
    private ImageRoomRepository imageRoomRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<HouseDTO> findAll() {
        List<HouseEntity> houseDTOS = houseEntityRepository.findAll();
        return houseConverter.toDTOs(houseDTOS);
    }

    @Override
    public HouseDTO findOneById(long id) {
        return houseConverter.toDTO(houseEntityRepository.findHouseEntityById(id));
    }

    @Override
    public HouseDTO save(HouseDTO dto, long idUser) {
//        RoomEntity roomEntity = roomConverter.toEntity(dto);
//        roomEntity.setUser(userRepository.findOneById(idUser));
//        roomEntity.setLocation(locationRepository.findOneByCode(dto.getCodeLocation()));
//
//        RoomEntity saveRoom = roomRepository.save(roomEntity);
//
//        List<ImageRoomEntity> imageRoomEntities = new ArrayList<>();
//        for (String image : dto.getImages()) {
//            imageRoomEntities.add(
//                    imageRoomRepository.save(ImageRoomEntity.builder()
//                            .urlImage(image)
//                            .room(saveRoom)
//                            .build()));
//        }
//        saveRoom.setImages(imageRoomEntities);
//        return roomConverter.toDTO(saveRoom);
        return null;
    }

    @Override
    public HouseDTO update(HouseDTO dto) {
        return null;
    }
}
