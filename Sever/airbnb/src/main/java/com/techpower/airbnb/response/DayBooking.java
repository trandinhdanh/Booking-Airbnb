package com.techpower.airbnb.response;

import lombok.*;

import java.time.LocalDate;
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DayBooking {
    private LocalDate startDate;
    private LocalDate endDate;
}
