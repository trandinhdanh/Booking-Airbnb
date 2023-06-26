package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.RoomConverter;
import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.entity.DayBooking;
import com.techpower.airbnb.entity.ImageRoomEntity;
import com.techpower.airbnb.entity.OrderEntity;
import com.techpower.airbnb.entity.RoomEntity;
import com.techpower.airbnb.repository.*;
import com.techpower.airbnb.request.SearchHouseRequest;
import com.techpower.airbnb.service.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoomService implements IRoomService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomConverter roomConverter;
    @Autowired
    private ImageRoomRepository imageRoomRepository;
    @Autowired
    private LocationRepository locationRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<RoomDTO> findAll() {
        List<RoomEntity> roomEntities = roomRepository.findAll();
        return roomConverter.toDTOs(roomEntities);
    }

    @Override
    public RoomDTO findOneById(long id) {
        return roomConverter.toDTO(roomRepository.findOneById(id));
    }

    @Override
    public RoomDTO save(RoomDTO dto, long idUser) {
        RoomEntity roomEntity = roomConverter.toEntity(dto);
        roomEntity.setUser(userRepository.findOneById(idUser));
        roomEntity.setLocation(locationRepository.findOneByCode(dto.getCodeLocation()));

        RoomEntity saveRoom = roomRepository.save(roomEntity);

        List<ImageRoomEntity> imageRoomEntities = new ArrayList<>();
        for (String image : dto.getImages()) {
            imageRoomEntities.add(
                    imageRoomRepository.save(ImageRoomEntity.builder()
                            .urlImage(image)
                            .room(saveRoom)
                            .build()));
        }
        saveRoom.setImages(imageRoomEntities);
        return roomConverter.toDTO(saveRoom);
    }

    @Override
    public RoomDTO update(RoomDTO dto) {
        return null;
    }

    @Override
    public List<RoomDTO> search(SearchHouseRequest request) {
        List<RoomDTO> roomDTOS = roomConverter.toDTOs(roomRepository.findByLocation_Id(request.getIdLocation()));
        for (RoomDTO roomDTO : roomDTOS) {
            if (request.getGuests() <= roomDTO.getMaxGuests()) {
                List<DayBooking> bookingDates = getBookingDatesByRoom(roomDTO.getId());
                roomDTO.setAvailable(isBookingConflict(bookingDates, request.getStartDate(), request.getEndDate()));
            }
        }
        return roomDTOS;
    }

    public List<DayBooking> getBookingDatesByRoom(long idRoom) {
        List<OrderEntity> orderEntities = orderRepository.findAllByRoomId(idRoom);
        List<DayBooking> bookingDates = new ArrayList<>();
        for (OrderEntity oder: orderEntities) {
            bookingDates.add(new DayBooking(oder.getReceivedDate(), oder.getCheckoutDate()));

        }
        return bookingDates;
    }

    public boolean isBookingConflict(List<DayBooking> list, LocalDate startDate, LocalDate endDate) {
        for (DayBooking booking : list) {
            if ((startDate.isAfter(booking.getStartDate()) && startDate.isBefore(booking.getEndDate())) ||
                    (endDate.isAfter(booking.getStartDate()) && endDate.isBefore(booking.getEndDate())) ||
                    (startDate.isBefore(booking.getStartDate()) && endDate.isAfter(booking.getEndDate()))) {
                return false; // Trùng lịch
            }
        }
        return true; // Không trùng lịch
    }
}
