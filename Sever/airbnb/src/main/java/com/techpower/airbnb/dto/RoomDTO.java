package com.techpower.airbnb.dto;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    private Long id;
    private String name;
    private String description;
    private String price;
    private List<String> images;
    private boolean washingMachine;
    private boolean television;
    private boolean airConditioner;
    private boolean wifi;
    private boolean kitchen;
    private boolean parking;
    private boolean pool;
    private boolean hotAndColdMachine;
}
