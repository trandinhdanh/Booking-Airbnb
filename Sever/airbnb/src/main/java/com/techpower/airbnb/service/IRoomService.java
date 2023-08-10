package com.techpower.airbnb.service;

import com.google.maps.errors.ApiException;
import com.techpower.airbnb.dto.FeedbackDTO;
import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.entity.RoomEntity;
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

//<<<<<<< HEAD
//    void deleteById(Long id);
//=======
    String delete(Long idRoom);

    List<FeedbackDTO> findAllFeedbackByIDRoom(Long idRoom);
//>>>>>>> dca9d9ef493fde5fa3cca7fd6ffb7dbb0abc7dc5
}
