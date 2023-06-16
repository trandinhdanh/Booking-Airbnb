package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.RoomDTO;

import java.util.List;

public interface IRoomService {
    List<RoomDTO> findAll();

    RoomDTO save(RoomDTO dto);
}
