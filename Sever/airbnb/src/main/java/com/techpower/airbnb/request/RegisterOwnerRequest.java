package com.techpower.airbnb.request;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
@Data
@Setter
@Getter
@Builder
public class RegisterOwnerRequest {
    private String name;
    @NotNull(message = "Số điện thoại không được trống")
    private String phone;
    @Email(message = "Email không hợp lệ !!!")
    private String email;
    @Size(min = 6, max = 50, message = "Mật khẩu phải ít nhất 6 kí tự")
    private String password;
}
