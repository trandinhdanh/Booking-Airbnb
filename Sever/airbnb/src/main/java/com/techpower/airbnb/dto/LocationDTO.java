package com.techpower.airbnb.dto;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LocationDTO {
    private Long id;
    private String codeLocation;
    private String name;

}
