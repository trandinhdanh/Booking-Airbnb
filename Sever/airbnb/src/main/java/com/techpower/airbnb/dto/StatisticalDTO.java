package com.techpower.airbnb.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StatisticalDTO {
    private int year;
    private int month;
    private double totalRevenue;
    private double reallyReceived;
}
