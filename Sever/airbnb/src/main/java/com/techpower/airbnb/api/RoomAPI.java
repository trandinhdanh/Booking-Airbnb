package com.techpower.airbnb.api;

import com.techpower.airbnb.dto.RoomDTO;
import com.techpower.airbnb.entity.ImageRoomEntity;
import com.techpower.airbnb.service.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/rooms")
public class RoomAPI {
    @Autowired
    private IRoomService iRoomService;

    @GetMapping("")
    public ResponseEntity<List<RoomDTO>> findAll() {
        List<RoomDTO> dtos = iRoomService.findAll();
        if (!dtos.isEmpty())
            return ResponseEntity.ok(dtos);
        else return ResponseEntity.noContent().build();
    }
}
