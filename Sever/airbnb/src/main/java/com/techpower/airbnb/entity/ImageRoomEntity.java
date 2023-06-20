package com.techpower.airbnb.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "image")
public class ImageRoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private RoomEntity room;
    @ManyToOne
    @JoinColumn(name = "house_id")
    private HouseEntity house;
    @Column
    private String urlImage;
}
