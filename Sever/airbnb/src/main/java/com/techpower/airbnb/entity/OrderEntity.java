package com.techpower.airbnb.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orders_id")
    private Long id;
    @Column
    private LocalDate receivedDate;
    @Column
    private LocalDate checkoutDate;
    @Column
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private RoomEntity room;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

}
