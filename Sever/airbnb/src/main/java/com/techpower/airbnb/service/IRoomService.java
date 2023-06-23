package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.request.SearchHouseRequest;

import java.util.List;

public interface IRoomService {
    List<RoomDTO> findAll();

    RoomDTO findOneById(long id);

    RoomDTO save(RoomDTO dto, long idUser);

    RoomDTO update(RoomDTO dto);

    List<RoomDTO> search(SearchHouseRequest request);
}
