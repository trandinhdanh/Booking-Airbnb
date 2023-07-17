package com.techpower.airbnb.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Builder
public class OrderDTO {
    private long id;
    @NotNull
    private Long idUser;
    @NotNull
    private RoomDTO roomDTO;
    private String status;
    @NotNull
    private LocalDate receivedDate;
    @NotNull
    private LocalDate checkoutDate;
    @NotNull
    private int numGuests;
    private double totalPrice;

}
