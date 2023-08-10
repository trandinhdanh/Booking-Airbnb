package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.WishlistDTO;
import com.techpower.airbnb.entity.WishlistEntity;

import java.util.List;

public interface IWishlistService {
    List<WishlistDTO> findAll();
    WishlistDTO addToWishlist(Long userId, Long roomId);
    List<WishlistDTO> findAllByUserId(Long userId);
    String removeToWishlist(Long userId, Long roomId);
}
