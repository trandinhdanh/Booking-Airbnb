package com.techpower.airbnb.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomBookings {
    private String name;
    private List<DayBooking> dayBookings;
}
