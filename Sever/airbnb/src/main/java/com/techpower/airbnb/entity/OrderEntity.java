package com.techpower.airbnb.entity;

import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.constant.PaymentMethod;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    @Enumerated(EnumType.STRING)
    private Order status;
    @Column
    private int numGuests;
    @Column
    private double totalPrice;
    @Column
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private RoomEntity room;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;


}
