package com.techpower.airbnb.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room")
// chỉ tính phòng ngủ
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;
//    giá thuê 1 phòng
    @Column
    private double price;
    @Column(name = "num_beds")
    private int numBeds;
    @Column(name = "max_guests")
    private int maxGuests;
//    kiểm tra phòng trống
    @Column
    private boolean available;
//    if available is true => startDate and endDate == null
//    else startDate and endDate == order date
    @Column
    private LocalDateTime startDate;
    @Column
    private LocalDateTime endDate;
    @ManyToOne
    @JoinColumn(name = "house_id")
    private HouseEntity house;
    @OneToMany(mappedBy = "room")
    private List<OrderEntity> orders = new ArrayList<>();
    @OneToMany(mappedBy = "room")
    private List<CommentEntity> comments = new ArrayList<>();
    @OneToMany(mappedBy = "room")
    private List<ImageRoomEntity> images = new ArrayList<>();



}
