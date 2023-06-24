package com.techpower.airbnb.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Builder
public class OrderDTO {
    private Long idUser;
    private Long idRoom;
    private LocalDate receivedDate;
    private LocalDate checkoutDate;
    private Integer quantity;
}
