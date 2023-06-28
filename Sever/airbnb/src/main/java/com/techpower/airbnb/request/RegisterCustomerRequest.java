package com.techpower.airbnb.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterCustomerRequest {

    private String name;
    private String phone;
    private String email;
    private String password;
    private String birthday;
    private boolean gender;

}
