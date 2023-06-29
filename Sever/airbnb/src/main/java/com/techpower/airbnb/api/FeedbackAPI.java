package com.techpower.airbnb.api;

import com.techpower.airbnb.dto.FeedbackDTO;
import com.techpower.airbnb.service.IFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/feedbacks")
public class FeedbackAPI {
    @Autowired
    private IFeedbackService iFeedbackService;

    @PostMapping
    public ResponseEntity<?> post(@RequestBody FeedbackDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(iFeedbackService.post(dto));
    }
}
