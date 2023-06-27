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
import com.techpower.airbnb.request.RegisterOwnerRequest;
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

    public AuthenticationResponse register(RegisterOwnerRequest request) {
        var user = UserEntity.builder()
                .phone(request.getPhone())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.OWNER)
                .status(Status.ACTIVE)
                .build();
        userRepository.save(user);

        String token = jwtUtil.issueToken(user.getUsername(), user.getRole().toString());

        return AuthenticationResponse.builder()
                .token(token)
                .userDTO(userDTOMapper.apply(user))
                .build();
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"text-align: center; margin: 0 auto; max-width: 600px; padding: 20px; border: 1px solid #ccc; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">\n" +
                "  <img src=\"https://res.cloudinary.com/drn7nawnc/image/upload/v1687899742/unnamed_gssfpv.png\" alt=\"Logo\" style=\"max-width: 50%;\">\n" +
                "  <h2 style=\"font-size: 24px; margin-bottom: 10px;\">Hi " + name + ",</h2>" +
                "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. Please click on the below link to activate your account: </p>" +
                "<blockquote style=\"Margin:0 0 20px 0;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\">" +
                "   <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> " +
                "       <a href=\"" + link + "\">Activate Now</a> " +
                "   </p>" +
                "</blockquote>" +
                "<p style=\"font-size: 16px; margin-bottom: 20px;\">Link will expire in 15 minutes. </p>" +
                "<p style=\"font-size: 16px; margin-bottom: 20px;\">See you soon</p>" +
                "</div>";
    }

}
