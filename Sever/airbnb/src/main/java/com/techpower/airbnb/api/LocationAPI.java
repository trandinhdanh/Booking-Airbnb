package com.techpower.airbnb.api;

import com.techpower.airbnb.dto.LocationDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/locations")
@Validated
public class LocationAPI {
    @PostMapping
    public ResponseEntity<LocationDTO> save(@Valid @RequestBody LocationDTO dto) {
        return null;
    }
}
