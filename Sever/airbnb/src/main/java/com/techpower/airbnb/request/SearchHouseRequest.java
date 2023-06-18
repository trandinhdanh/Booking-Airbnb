package com.techpower.airbnb.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SearchHouseRequest {
    private String location;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int guests;
}
