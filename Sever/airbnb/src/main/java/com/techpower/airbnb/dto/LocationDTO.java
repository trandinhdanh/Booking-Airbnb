package com.techpower.airbnb.dto;

import lombok.*;

import javax.validation.constraints.NotNull;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationDTO {
    private Long id;
    private String code;
    @NotNull(message = "Please enter the city name")
    private String name;
}
