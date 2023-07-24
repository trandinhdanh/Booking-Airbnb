package com.techpower.airbnb.service;

import com.google.maps.errors.ApiException;
import com.techpower.airbnb.dto.FeedbackDTO;
import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.request.SearchHouseRequest;
import com.techpower.airbnb.response.DayBooking;

import java.io.IOException;
import java.util.List;

public interface IRoomService {
    List<RoomDTO> findAll();

    RoomDTO findOneById(long id);

    RoomDTO save(RoomDTO dto, long idUser) throws IOException, InterruptedException, ApiException;

    RoomDTO update(RoomDTO dto) throws IOException, InterruptedException, ApiException;

    List<RoomDTO> search(SearchHouseRequest request);

    List<DayBooking> checkDateOfRoom(long idRoom);

    String delete(Long idRoom);

    List<FeedbackDTO> findAllFeedbackByIDRoom(Long idRoom);
}
