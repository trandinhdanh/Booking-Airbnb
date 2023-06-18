package com.techpower.airbnb.auth;


import com.techpower.airbnb.constant.Role;
import com.techpower.airbnb.constant.Status;
import com.techpower.airbnb.converter.UserDTOMapper;
import com.techpower.airbnb.dto.UserDTO;
import com.techpower.airbnb.entity.UserEntity;
import com.techpower.airbnb.jwt.JWTUtil;
import com.techpower.airbnb.repository.UserRepository;
import com.techpower.airbnb.request.AuthenticationRequest;
import com.techpower.airbnb.request.RegisterCustomerRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserDTOMapper userDTOMapper;
    private final JWTUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
private final UserRepository userRepository;

    public AuthenticationResponse login(AuthenticationRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );
        UserEntity principal = (UserEntity) authentication.getPrincipal();
        UserDTO userDTO = userDTOMapper.apply(principal);
        String token = jwtUtil.issueToken(userDTO.userName(), userDTO.role());
        return new AuthenticationResponse(token, userDTO);
    }

    public AuthenticationResponse register(RegisterCustomerRequest request) {
        var user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .birthday(request.getBirthday())
                .gender(request.isGender())
                .role(Role.CUSTOMER)
                .status(Status.ACTIVE)
                .build();
        userRepository.save(user);


        String token = jwtUtil.issueToken(user.getUsername(), user.getRole().toString());

        return AuthenticationResponse.builder()
                .token(token)
                .userDTO(userDTOMapper.apply(user))
                .build();
    }
}
