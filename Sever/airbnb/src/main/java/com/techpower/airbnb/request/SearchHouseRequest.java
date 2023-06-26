package com.techpower.airbnb.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class SearchHouseRequest {
    private Long idLocation;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer guests;
}
