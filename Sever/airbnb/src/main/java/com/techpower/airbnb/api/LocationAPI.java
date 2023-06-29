package com.techpower.airbnb.api;

import com.techpower.airbnb.dto.LocationDTO;
import com.techpower.airbnb.service.ILocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/locations")
public class LocationAPI {
    @Autowired
    private ILocationService locationService;

    @GetMapping
    public ResponseEntity<?> getAllLocation() {
        if (locationService.getAllLocation().size() > 0) {
            return ResponseEntity.ok().body(locationService.getAllLocation());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không có kết quả");
    }
}
