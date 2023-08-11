package com.techpower.airbnb.api;

import com.techpower.airbnb.constant.Status;
import com.techpower.airbnb.dto.UserDTO;
import com.techpower.airbnb.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/users")
public class UserAPI {
    @Autowired
    private IUserService userService;

    @GetMapping("/customer")
    public ResponseEntity<List<UserDTO>> getAllUser() {
        return ResponseEntity.ok(userService.getAllCustomer());
    }

    @GetMapping("/owner")
    public ResponseEntity<List<UserDTO>> getAllOwner() {
        return ResponseEntity.ok(userService.getAllOwner());
    }

    @PutMapping("/{idUser}/status/{status}")
    public ResponseEntity<UserDTO> lock(@PathVariable("idUser") long idUser,
                                        @PathVariable("status") String status) {
        UserDTO deletedUser = userService.lock(idUser, status);
        if (deletedUser != null) {
            return ResponseEntity.ok(deletedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{idUser}")
    public ResponseEntity<?> getInformation(@PathVariable("idUser") Long idUser) {
        return ResponseEntity.ok(userService.getInformation(idUser));
    }

    @GetMapping("/{idUser}/orders")
    public ResponseEntity<?> findAllOrders(@PathVariable("idUser") long idUser) {
        return ResponseEntity.ok(userService.findAllOrders(idUser));
    }

    @GetMapping("/{idUser}/manager-orders")
    public ResponseEntity<?> getAllOrdersByOwner(@PathVariable("idUser") Long idUser) {
        return ResponseEntity.ok(userService.getAllOrdersByOwner(idUser));
    }

    @GetMapping("/{idUser}/rooms")
    public ResponseEntity<?> findAllRooms(@PathVariable("idUser") long idUser) {
        return ResponseEntity.ok(userService.findAllRooms(idUser));
    }

    @GetMapping("/{idUser}/bookings-date")
    public ResponseEntity<?> findAllBookingsDate(@PathVariable("idUser") Long idUser) {
        return ResponseEntity.ok(userService.findAllBookingsDate(idUser));
    }

    @GetMapping("/{idUser}/feedback")
    public ResponseEntity<?> findAllFeedback(@PathVariable("idUser") Long idUser) {
        return ResponseEntity.ok(userService.findAllFeedbackByCustomer(idUser));
    }

    @GetMapping("/{idUser}/manager-feedback")
    public ResponseEntity<?> getAllFeedbackByOwner(@PathVariable("idUser") Long idUser) {
        return ResponseEntity.ok(userService.getAllFeedbackByOwner(idUser));
    }

    @PutMapping("/{idUser}")
    public ResponseEntity<?> updateStatus(@PathVariable("idUser") long idUser,
                                          @RequestParam("status") Status status) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateStatus(status, idUser));
    }
}
