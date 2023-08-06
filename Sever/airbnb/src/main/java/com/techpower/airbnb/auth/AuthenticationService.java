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
import com.techpower.airbnb.service.EmailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserDTOMapper userDTOMapper;
    private final JWTUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final EmailSender emailSender;
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
        if (principal.getStatus().equals(Status.ACTIVE)) {
            String token = jwtUtil.issueToken(userDTO.userName(), userDTO.role());
            return new AuthenticationResponse(token, userDTO);
        } else return new AuthenticationResponse("Status: " + principal.getStatus(), userDTO);
    }

    public AuthenticationResponse register(RegisterCustomerRequest request) {

        boolean userExists = userRepository
                .findByEmail(request.getEmail())
                .isPresent();

        String codeConfirmed = generateRandomString();
        if (userExists) {
            // TODO check of attributes are the same and
            // TODO if email not confirmed send confirmation email.
            throw new IllegalStateException("email already taken");
        }

        var user = UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .birthday(request.getBirthday())
                .gender(request.isGender())
                .role(Role.CUSTOMER)
                .status(Status.ACTIVE)
                .confirmed(false)
                .codeConfirmed(codeConfirmed)
                .build();
        userRepository.save(user);


        String token = jwtUtil.issueToken(user.getUsername(), user.getRole().toString());

        emailSender.send(
                request.getEmail(),
                buildEmail(request.getName(), codeConfirmed),
                "Confirm your email");

        return AuthenticationResponse.builder()
                .token(token)
                .userDTO(userDTOMapper.apply(user))
                .build();
    }

    public AuthenticationResponse register(RegisterOwnerRequest request) {
        String codeConfirmed = generateRandomString();
        var user = UserEntity.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.OWNER)
                .status(Status.ACTIVE)
                .confirmed(false)
                .codeConfirmed(codeConfirmed)
                .build();
        userRepository.save(user);

        String token = jwtUtil.issueToken(user.getUsername(), user.getRole().toString());


        emailSender.send(
                request.getEmail(),
                buildEmail(request.getName(), codeConfirmed),
                "Confirm your email");

        return AuthenticationResponse.builder()
                .token(token)
                .userDTO(userDTOMapper.apply(user))
                .build();
    }

    @Transactional
    public String confirmToken(String email, String token) {
        Optional<UserEntity> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            if (user.get().getCodeConfirmed().equals(token)) {
                userRepository.updateConfirmedByEmailAndCodeConfirmed(true, email, token);
                return "confirmed";
            }
        }
        return "not confirmed";
    }

    public String generateRandomString() {
        char[] CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();
        Random random = new Random();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(CHARACTERS.length);
            sb.append(CHARACTERS[index]);
        }
        return sb.toString();
    }

    private String buildEmail(String name, String link) {
        return "<div style=\"text-align: center; margin: 0 auto; max-width: 600px; padding: 20px; border: 1px solid #ccc; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">\n" +
                "  <img src=\"https://res.cloudinary.com/drn7nawnc/image/upload/v1687899742/unnamed_gssfpv.png\" alt=\"Logo\" style=\"max-width: 50%;\">\n" +
                "  <h2 style=\"font-size: 24px; margin-bottom: 10px;\">Hi " + name + ",</h2>" +
                "<p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Thank you for registering. To complete the registration, enter the verification code below on the website to continue the experience: </p>" +
                "<blockquote style=\"Margin:0 0 20px 0;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\">" +
                "  <h2 style=\"Margin:0 0 20px 0;font-size: 24px; margin-bottom: 10px;color: darkblue;background: gainsboro;\">" + link + "</h2>" +
                "</blockquote>" +
                "<p style=\"font-size: 16px; margin-bottom: 20px;\">Link will expire in 15 minutes. </p>" +
                "<p style=\"font-size: 16px; margin-bottom: 20px;\">See you soon</p>" +
                "</div>";
    }
@Transactional
    public String delete(String email) {
        userRepository.deleteByEmail(email);
        return "deleted";
    }
}
