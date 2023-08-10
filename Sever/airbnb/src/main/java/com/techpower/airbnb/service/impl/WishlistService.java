package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.WishlistConverter;
import com.techpower.airbnb.dto.WishlistDTO;
import com.techpower.airbnb.entity.RoomEntity;
import com.techpower.airbnb.entity.UserEntity;
import com.techpower.airbnb.entity.WishlistEntity;
import com.techpower.airbnb.repository.RoomRepository;
import com.techpower.airbnb.repository.UserRepository;
import com.techpower.airbnb.repository.WishlistRepository;
import com.techpower.airbnb.service.IWishlistService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class WishlistService implements IWishlistService {
    @Autowired
    WishlistRepository wishlistRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    WishlistConverter wishlistConverter;
    @Override
    public List<WishlistDTO> findAll() {
        return wishlistConverter.toDTOs(wishlistRepository.findAll());
    }

    @Override
    public WishlistDTO addToWishlist(Long userId, Long roomId) {
        List<WishlistDTO> list = wishlistConverter.toDTOs(wishlistRepository.findAllByUserId(userId));
        for (WishlistDTO w : list) {
            if (w.getRoomDTO().getId() == roomId) return null;
        }
        WishlistEntity wishlistEntity = new WishlistEntity();
        UserEntity user = userRepository.findOneById(userId);
        RoomEntity room = roomRepository.findOneById(roomId);
        wishlistEntity.setUser(user);
        wishlistEntity.setRoom(room);
        WishlistDTO wishlistDTO = wishlistConverter.toDTO(wishlistRepository.save(wishlistEntity));
        return wishlistDTO;
    }

    @Override
    public List<WishlistDTO> findAllByUserId(Long userId) {
        return wishlistConverter.toDTOs(wishlistRepository.findAllByUserId(userId));
    }
    @Transactional
    @Override
    public String removeToWishlist(Long userId, Long roomId) {
        wishlistRepository.deleteByUser_IdAndRoom_Id(userId,roomId);
        return "Remove wishlist success";
    }
}
