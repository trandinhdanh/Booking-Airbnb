package com.techpower.airbnb.service.impl;

import com.google.maps.errors.ApiException;
import com.google.maps.model.LatLng;
import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.converter.AddressConverter;
import com.techpower.airbnb.converter.RoomConverter;
import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.entity.*;
import com.techpower.airbnb.response.DayBooking;
import com.techpower.airbnb.repository.*;
import com.techpower.airbnb.request.SearchHouseRequest;
import com.techpower.airbnb.service.IRoomService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
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
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private GeocodingService geocodingService;
    @Autowired
    private AddressConverter addressConverter;
    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<RoomDTO> findAll() {
        List<RoomEntity> roomEntities = roomRepository.findAll();
        return roomConverter.toDTOs(roomEntities);
    }

    @Override
    public RoomDTO findOneById(long id) {
        RoomDTO roomDTO = roomConverter.toDTO(roomRepository.findOneById(id));
        roomDTO.setTotalStar(averageStar(id));
        return roomDTO;
    }

    @Transactional
    @Override
    public RoomDTO save(RoomDTO dto, long idUser) throws IOException, InterruptedException, ApiException {
        RoomEntity roomEntity = roomConverter.toEntity(dto);
        roomEntity.setUser(userRepository.findOneById(idUser));
        roomEntity.setLocation(locationRepository.findOneByCode(dto.getCodeLocation()));

        AddressEntity addressEntity = roomEntity.getAddress();
        LatLng latLng = geocodingService.getLatLngFromAddress(addressEntity.getFullAddress());
        if (latLng == null) {
            addressEntity.setLat(0);
            addressEntity.setLng(0);
        }else {
            // Lưu tọa độ vào đối tượng Address
            addressEntity.setLat(latLng.lat);
            addressEntity.setLng(latLng.lng);
        }
        // Lưu đối tượng Address vào cơ sở dữ liệu
        addressRepository.save(addressEntity);

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
        RoomEntity roomEntityOld = roomRepository.findOneById(dto.getId());
        RoomEntity roomEntityNew = roomConverter.toEntity(dto, roomEntityOld);
        return roomConverter.toDTO(roomRepository.save(roomEntityNew));
    }

    @Override
    public List<RoomDTO> search(SearchHouseRequest request) {
        List<RoomDTO> roomDTOS = roomConverter.toDTOs(roomRepository.findByLocation_Id(request.getIdLocation()));
        for (RoomDTO roomDTO : roomDTOS) {
            if (request.getGuests() <= roomDTO.getMaxGuests()) {
                List<DayBooking> bookingDates = checkDateOfRoom(roomDTO.getId());
                roomDTO.setAvailable(isBookingConflict(bookingDates, request.getStartDate(), request.getEndDate()));
            }
        }
        return roomDTOS;
    }

    @Override
    public List<DayBooking> checkDateOfRoom(long idRoom) {
        List<DayBooking> result = new ArrayList<>();
        List<OrderEntity> orderEntities = orderRepository.findAllByRoomId(idRoom);
        for (OrderEntity orderEntity : orderEntities) {
            if (!orderEntity.getStatus().equals(Order.CANCEL)) {
                result.add(DayBooking.builder()
                        .startDate(orderEntity.getReceivedDate())
                        .endDate(orderEntity.getCheckoutDate())
                        .build());
            }
        }
        return result;
    }

    public boolean isBookingConflict(List<DayBooking> list, LocalDate startDate, LocalDate endDate) {
        for (DayBooking booking : list) {
            if ((startDate.isAfter(booking.getStartDate()) && startDate.isBefore(booking.getEndDate()) ) ||
                    (endDate.isAfter(booking.getStartDate()) && endDate.isBefore(booking.getEndDate())) ||
                    (startDate.equals(booking.getStartDate()) && endDate.equals(booking.getEndDate())) ||
                    (startDate.equals(booking.getStartDate()) && endDate.isBefore(booking.getEndDate())) ||
                    (startDate.equals(booking.getStartDate()) && endDate.isAfter(booking.getEndDate())) ||
                    (startDate.isBefore(booking.getStartDate()) && endDate.equals(booking.getEndDate())) ||
                    (startDate.isAfter(booking.getStartDate()) && endDate.equals(booking.getEndDate())) ||
                    (startDate.isBefore(booking.getStartDate()) && endDate.isAfter(booking.getEndDate()))) {
                return false; // Trùng lịch
            }
        }
        return true; // Không trùng lịch
    }

    private double averageStar(long idOrder) {
        double result = 0;
        List<FeedbackEntity> feedbackEntities = feedbackRepository.findAllByOrderId(idOrder);
        for (FeedbackEntity feedbackEntity : feedbackEntities) {
            result += feedbackEntity.getNumberOfStars();
        }
        return Math.round((result / feedbackEntities.size()) * 100.0) / 100.0;
    }
}
