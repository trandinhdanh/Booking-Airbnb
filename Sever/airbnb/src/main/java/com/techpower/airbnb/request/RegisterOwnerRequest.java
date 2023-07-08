package com.techpower.airbnb.request;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Setter
@Getter
@Builder
public class RegisterOwnerRequest {
    @NotBlank(message = "Tên người dùng không được để trống")
    private String name;
    @Pattern(regexp = "^\\d{10}$", message = "Số điện thoại không hợp lệ")
    private String phone;
    @Email(message = "Địa chỉ email không hợp lệ")
    private String email;
    @Size(min = 6, max = 50, message = "Mật khẩu phải ít nhất 6 kí tự")
    private String password;
}
