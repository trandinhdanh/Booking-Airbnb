package com.techpower.airbnb.request;

import javax.validation.constraints.Email;

public record AuthenticationRequest(
        @Email(message = "Invalid email address")
        String email,
        String password
) {
}
