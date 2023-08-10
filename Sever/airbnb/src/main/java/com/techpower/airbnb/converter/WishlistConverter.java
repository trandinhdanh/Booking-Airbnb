package com.techpower.airbnb.converter;

import com.techpower.airbnb.dto.WishlistDTO;
import com.techpower.airbnb.entity.WishlistEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class WishlistConverter {
    @Autowired
    private RoomConverter roomConverter;
    @Autowired
    private UserDTOMapper userDTOMapper;

    public WishlistDTO toDTO(WishlistEntity wishlistEntity) {
        return WishlistDTO.builder()
                .id(wishlistEntity.getId())
                .userDTO(userDTOMapper.apply(wishlistEntity.getUser()))
                .roomDTO(roomConverter.toDTO(wishlistEntity.getRoom())).build();
    }

    public List<WishlistDTO> toDTOs(List<WishlistEntity> list) {
        List<WishlistDTO> wishlistDTO = new ArrayList<>();
        for(WishlistEntity l : list) {
            wishlistDTO.add(toDTO(l));
        }
        return wishlistDTO;
    }
}
