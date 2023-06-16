package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.RoomConverter;
import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.entity.RoomEntity;
import com.techpower.airbnb.repository.RoomRepository;
import com.techpower.airbnb.service.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService implements IRoomService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomConverter roomConverter;

    @Override
    public List<RoomDTO> findAll() {
        List<RoomEntity> roomEntities = roomRepository.findAll();
        return roomConverter.toDTOs(roomEntities);
    }

    @Override
    public RoomDTO save(RoomDTO dto) {
        return null;
    }
}
