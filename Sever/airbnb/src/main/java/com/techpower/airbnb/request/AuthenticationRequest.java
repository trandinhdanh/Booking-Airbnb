package com.techpower.airbnb.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

public record AuthenticationRequest(
        @Email(message = "Invalid email address")
        String email,
        @Size(min = 6, max = 50, message = "Mật khẩu phải ít nhất 6 kí tự")
        String password
) {
}
