package com.techpower.airbnb.auth;


import com.techpower.airbnb.dto.UserDTO;
import lombok.Builder;

@Builder
public record AuthenticationResponse (
        String token,
        UserDTO userDTO){
}
