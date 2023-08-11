package com.techpower.airbnb.api;

import com.techpower.airbnb.dto.WishlistDTO;
import com.techpower.airbnb.service.IWishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/wishlist")
public class WishlistAPI {
    @Autowired
    private IWishlistService iWishlistService;
    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistDTO>> getWishlist(@PathVariable Long userId) {
        return ResponseEntity.ok(iWishlistService.findAllByUserId(userId));
    }

    @PostMapping("/{idUser}/addWishlist")
    public ResponseEntity<?> addToWishlist(@PathVariable Long idUser, @RequestParam(name = "roomId") Long roomId) {
        WishlistDTO wishlistDTO = iWishlistService.addToWishlist(idUser,roomId);
        if (wishlistDTO == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room already exist");
        } else
            return ResponseEntity.ok(wishlistDTO);
    }
        @DeleteMapping("{idUser}/delete")
    public ResponseEntity<?> delete(@PathVariable Long idUser, @RequestParam(name = "roomId") Long roomId){
        return ResponseEntity.ok(iWishlistService.removeToWishlist(idUser,roomId));
    }


}
