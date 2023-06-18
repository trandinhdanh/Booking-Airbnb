package com.techpower.airbnb.auth;

import com.techpower.airbnb.constant.Role;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterCustomerRequest {

    private String name;
    private String email;
    private  String password;
    private  String phone;
    private String birthday;
    private boolean gender;

}
