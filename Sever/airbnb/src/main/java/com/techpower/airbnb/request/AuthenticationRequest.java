package com.techpower.airbnb.request;

public record AuthenticationRequest(
        String email,
        String password
) {
}
