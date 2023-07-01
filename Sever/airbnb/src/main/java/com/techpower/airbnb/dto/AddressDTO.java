package com.techpower.airbnb.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
    private String fullAddress;
    private double lat;
    private double lng;
}
