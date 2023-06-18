package com.techpower.airbnb.converter;

import com.techpower.airbnb.dto.UserDTO;
import com.techpower.airbnb.entity.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserDTOMapper implements Function<UserEntity, UserDTO> {
    @Override
    public UserDTO apply(UserEntity user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getStatus(),
                user.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList())
        );
    }
}
