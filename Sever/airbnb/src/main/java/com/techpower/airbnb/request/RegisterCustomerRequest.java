package com.techpower.airbnb.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterCustomerRequest {

    @NotBlank(message = "Tên người dùng không được để trống")
    private String name;
    @Pattern(regexp = "^\\d{10}$", message = "Số điện thoại không hợp lệ")
    private String phone;
    @Email(message = "Địa chỉ email không hợp lệ")
    private String email;
    @Size(min = 6, max = 50, message = "Mật khẩu phải ít nhất 6 kí tự")
    private String password;
    @NotBlank(message = "Vui lòng chọn ngày sinh")
    private String birthday;
    @NotNull(message = "Vui lòng chọn giới tính")
    private boolean gender;

}
