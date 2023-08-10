package com.techpower.airbnb.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WishlistDTO {
    private Long id;
    private UserDTO userDTO;
    private RoomDTO roomDTO;
}
