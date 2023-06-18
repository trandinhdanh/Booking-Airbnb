package com.techpower.airbnb.auth;

public record AuthenticationRequest(
        String email,
        String password
) {
}
