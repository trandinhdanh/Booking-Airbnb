package com.techpower.airbnb.api;

import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.constant.Status;
import com.techpower.airbnb.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/users")
public class UserAPI {
    @Autowired
    private IUserService userService;

    @GetMapping("/{idUser}/orders")
    public ResponseEntity<?> findAllOrders(@PathVariable("idUser") long idUser) {
        return ResponseEntity.ok(userService.findAllOrders(idUser));
    }

    @GetMapping("/{idUser}/rooms")
    public ResponseEntity<?> findAllRooms(@PathVariable("idUser") long idUser) {
        return ResponseEntity.ok(userService.findAllRooms(idUser));
    }

    @PutMapping("{idUser}")
    public ResponseEntity<?> updateStatus(@PathVariable("idUser") long idUser,
                                          @RequestParam("status") Status status) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateStatus(status, idUser));
    }
}
