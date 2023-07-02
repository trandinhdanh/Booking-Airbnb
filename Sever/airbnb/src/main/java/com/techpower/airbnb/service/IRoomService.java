package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.request.SearchHouseRequest;
import com.techpower.airbnb.response.DayBooking;

import java.util.List;

public interface IRoomService {
    List<RoomDTO> findAll();

    RoomDTO findOneById(long id);

    RoomDTO save(RoomDTO dto, long idUser);

    RoomDTO update(RoomDTO dto);

    List<RoomDTO> search(SearchHouseRequest request);

    List<DayBooking> checkDateOfRoom(long idRoom);

    void deleteById(Long id);
}
