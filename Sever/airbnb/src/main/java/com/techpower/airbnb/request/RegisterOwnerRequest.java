package com.techpower.airbnb.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class RegisterOwnerRequest {
    private String phone;
    private String email;
    private String password;
}
