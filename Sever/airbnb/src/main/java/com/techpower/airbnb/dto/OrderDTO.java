package com.techpower.airbnb.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Setter
@Getter
@Builder
public class OrderDTO {
    @NotNull
    private Long idUser;
    @NotNull
    private Long idRoom;
    @NotNull
    private String status;
    @NotNull
    private LocalDate receivedDate;
    @NotNull
    private LocalDate checkoutDate;
    @NotNull
    private Integer quantity;
}
