package com.techpower.airbnb.api;

import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.request.SearchHouseRequest;
import com.techpower.airbnb.response.DayBooking;
import com.techpower.airbnb.service.IRoomService;
import com.techpower.airbnb.service.impl.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/rooms")
public class RoomAPI {
    @Autowired
    private IRoomService iRoomService;
    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("")
    public ResponseEntity<List<RoomDTO>> findAll() {
        List<RoomDTO> dtos = iRoomService.findAll();
        if (!dtos.isEmpty())
            return ResponseEntity.ok(dtos);
        else return ResponseEntity.noContent().build();
    }

    @GetMapping("/{idRoom}")
    public ResponseEntity<RoomDTO> findOneById(@PathVariable("idRoom") long idRoom) {
        RoomDTO roomDTO = iRoomService.findOneById(idRoom);
        if (roomDTO != null) {
            return ResponseEntity.ok(roomDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/calendar/{idRoom}")
    public ResponseEntity<List<DayBooking>> calendar(@PathVariable("idRoom") long idRoom) {
        List<DayBooking> dayBookings = iRoomService.checkDateOfRoom(idRoom);
        if (!dayBookings.isEmpty()) return ResponseEntity.ok(dayBookings);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestBody SearchHouseRequest request) {
        if (iRoomService.search(request) != null) {
            return ResponseEntity.ok(iRoomService.search(request));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không có kết quả");
    }


    //    dung de test chức năng search
    @GetMapping("/trungNgay")
    public ResponseEntity<?> searchTrungNgay(@RequestParam("start") LocalDate start,
                                             @RequestParam("end") LocalDate end,
                                             @RequestParam("startSearch") LocalDate startSearch,
                                             @RequestParam("endSearch") LocalDate endSearch) {
        if ((startSearch.isAfter(start) && startSearch.isBefore(end)) ||
                (endSearch.isAfter(start) && endSearch.isBefore(end)) ||
                (startSearch.isBefore(start) && endSearch.isAfter(end))) {
            return ResponseEntity.ok("true"); // Trùng lịch
        }
        return ResponseEntity.ok("false");
    }


    @PostMapping("/{idUser}")
    public ResponseEntity<RoomDTO> save(@PathVariable("idUser") long idUser,
                                        @RequestParam("name") String name,
                                        @RequestParam("description") String description,
                                        @RequestParam("price") double price,
                                        @RequestParam(value = "images", required = false) List<MultipartFile> images,
                                        @RequestParam("codeLocation") String codeLocation,
                                        @RequestParam("address") String address,
                                        @RequestParam("washingMachine") boolean washingMachine,
                                        @RequestParam("television") boolean television,
                                        @RequestParam("airConditioner") boolean airConditioner,
                                        @RequestParam("wifi") boolean wifi,
                                        @RequestParam("kitchen") boolean kitchen,
                                        @RequestParam("parking") boolean parking,
                                        @RequestParam("pool") boolean pool,
                                        @RequestParam("hotAndColdMachine") boolean hotAndColdMachine,
                                        @RequestParam("maxGuests") int maxGuests,
                                        @RequestParam("numLivingRooms") int numLivingRooms,
                                        @RequestParam("numBathrooms") int numBathrooms,
                                        @RequestParam("numBedrooms") int numBedrooms) {

        List<String> imagesDTO = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            for (MultipartFile imageDetail : images) {
                if (!imageDetail.isEmpty())
                    imagesDTO.add(cloudinaryService.uploadImage(imageDetail));
            }
        }

        RoomDTO roomDTO = RoomDTO.builder()
                .name(name)
                .description(description)
                .price(price)
                .images(imagesDTO)
                .address(address)
                .codeLocation(codeLocation)
                .washingMachine(washingMachine)
                .television(television)
                .airConditioner(airConditioner)
                .wifi(wifi)
                .kitchen(kitchen)
                .parking(parking)
                .pool(pool)
                .hotAndColdMachine(hotAndColdMachine)
                .maxGuests(maxGuests)
                .numLivingRooms(numLivingRooms)
                .numBathrooms(numBathrooms)
                .numBedrooms(numBedrooms)
                .build();
        RoomDTO saveRoom = iRoomService.save(roomDTO, idUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveRoom);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomDTO> update(@PathVariable long id,
                                          @RequestParam("name") String name,
                                          @RequestParam("description") String description,
                                          @RequestParam("price") double price,
                                          @RequestParam(value = "images", required = false) List<MultipartFile> images,
                                          @RequestParam("codeLocation") String codeLocation,
                                          @RequestParam("washingMachine") boolean washingMachine,
                                          @RequestParam("television") boolean television,
                                          @RequestParam("airConditioner") boolean airConditioner,
                                          @RequestParam("wifi") boolean wifi,
                                          @RequestParam("kitchen") boolean kitchen,
                                          @RequestParam("parking") boolean parking,
                                          @RequestParam("pool") boolean pool,
                                          @RequestParam("hotAndColdMachine") boolean hotAndColdMachine) {

        List<String> imagesDTO = new ArrayList<>();
        if (images != null && !images.isEmpty()) {
            for (MultipartFile imageDetail : images) {
                if (!imageDetail.isEmpty())
                    imagesDTO.add(cloudinaryService.uploadImage(imageDetail));
            }
        }
        RoomDTO roomDTO = RoomDTO.builder()
                .id(id)
                .name(name)
                .description(description)
                .price(price)
                .images(imagesDTO)
                .codeLocation(codeLocation)
                .washingMachine(washingMachine)
                .television(television)
                .airConditioner(airConditioner)
                .wifi(wifi)
                .kitchen(kitchen)
                .parking(parking)
                .pool(pool)
                .hotAndColdMachine(hotAndColdMachine)
                .build();
        RoomDTO saveRoom = iRoomService.update(roomDTO);
        return ResponseEntity.status(HttpStatus.OK).body(saveRoom);
    }


}
