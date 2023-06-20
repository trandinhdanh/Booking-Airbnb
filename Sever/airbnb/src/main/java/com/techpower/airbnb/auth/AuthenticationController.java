package com.techpower.airbnb.auth;

import com.techpower.airbnb.request.AuthenticationRequest;
import com.techpower.airbnb.request.RegisterCustomerRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping("api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authenticationService.login(request);
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.token())
                .body(response);
    }

    @PostMapping("/register-customer")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterCustomerRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register(request));
    }


}




