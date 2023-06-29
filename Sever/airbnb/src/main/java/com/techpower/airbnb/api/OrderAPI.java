package com.techpower.airbnb.api;

import com.techpower.airbnb.constant.Order;
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

    @PostMapping("{idRoom}")
    public ResponseEntity<?> createOrder(@PathVariable("idRoom") long idRoom,
                                         @RequestBody OrderDTO orderDTO) {
        OrderDTO result = orderService.createOrder(orderDTO, idRoom);
        if (result == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order fail");
        } else
            return ResponseEntity.ok(result);
    }

    @PutMapping("{idOrder}")
    public ResponseEntity<?> updateStatus(@PathVariable("idOrder") long idOrder,
                                          @RequestParam("status") Order status) {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.updateStatus(status, idOrder));
    }

}
