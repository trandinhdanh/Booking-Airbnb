package com.techpower.airbnb.api;

import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/orders")
public class OrderAPI {

    @Autowired
    private IOrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO) {
        try {
            return ResponseEntity.ok(orderService.createOrder(orderDTO));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order failure");
        }
    }

}
