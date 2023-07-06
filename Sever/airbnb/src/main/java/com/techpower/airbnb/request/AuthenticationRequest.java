package com.techpower.airbnb.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record AuthenticationRequest(
        @Email(message = "Địa chỉ email không hợp lệ")
        String email,
        @Size(min = 6, max = 50, message = "Mật khẩu phải ít nhất 6 kí tự")
        String password
) {
}
