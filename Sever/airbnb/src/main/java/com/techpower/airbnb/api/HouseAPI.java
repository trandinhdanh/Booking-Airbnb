package com.techpower.airbnb.api;

import com.techpower.airbnb.dto.HouseDTO;
import com.techpower.airbnb.request.SearchHouseRequest;
import com.techpower.airbnb.service.IHouseService;
import com.techpower.airbnb.service.impl.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/houses")
public class HouseAPI {
    @Autowired
    private IHouseService iHouseService;
    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<List<HouseDTO>> findAll() {
        List<HouseDTO> dtos = iHouseService.findAll();
        if (!dtos.isEmpty())
            return ResponseEntity.ok(dtos);
        else return ResponseEntity.noContent().build();
    }

    @GetMapping("/{idHouse}")
    public ResponseEntity<HouseDTO> findOneById(@PathVariable("idHouse") long idHouse) {
        HouseDTO houseDTO = iHouseService.findOneById(idHouse);
        if (houseDTO != null) {
            return ResponseEntity.ok(houseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<HouseDTO>> search(@RequestBody SearchHouseRequest query) {
//        chưa làm gì cả
        List<HouseDTO> dtos = iHouseService.findAll();
        if (!dtos.isEmpty()){
            return ResponseEntity.ok(dtos);}
        else return ResponseEntity.notFound().build();
    }


//    @PostMapping("/{idUser}")
//    public ResponseEntity<RoomDTO> save(@PathVariable("idUser") long idUser,
//                                        @RequestParam("name") String name,
//                                        @RequestParam("description") String description,
//                                        @RequestParam("price") double price,
//                                        @RequestParam(value = "images", required = false) List<MultipartFile> images,
//                                        @RequestParam("codeLocation") String codeLocation,
//                                        @RequestParam("washingMachine") boolean washingMachine,
//                                        @RequestParam("television") boolean television,
//                                        @RequestParam("airConditioner") boolean airConditioner,
//                                        @RequestParam("wifi") boolean wifi,
//                                        @RequestParam("kitchen") boolean kitchen,
//                                        @RequestParam("parking") boolean parking,
//                                        @RequestParam("pool") boolean pool,
//                                        @RequestParam("hotAndColdMachine") boolean hotAndColdMachine) {
//
//        List<String> imagesDTO = new ArrayList<>();
//        if (images != null && !images.isEmpty()) {
//            for (MultipartFile imageDetail : images) {
//                if (!imageDetail.isEmpty())
//                    imagesDTO.add(cloudinaryService.uploadImage(imageDetail));
//            }
//        }
//
//        RoomDTO roomDTO = RoomDTO.builder()
//                .name(name)
//                .description(description)
//                .price(price)
//                .images(imagesDTO)
//                .codeLocation(codeLocation)
//                .washingMachine(washingMachine)
//                .television(television)
//                .airConditioner(airConditioner)
//                .wifi(wifi)
//                .kitchen(kitchen)
//                .parking(parking)
//                .pool(pool)
//                .hotAndColdMachine(hotAndColdMachine)
//                .build();
//        RoomDTO saveRoom = iRoomService.save(roomDTO, idUser);
//        return ResponseEntity.status(HttpStatus.CREATED).body(saveRoom);
//    }


}
