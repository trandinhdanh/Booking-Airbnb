package com.techpower.airbnb.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "room")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String description;
    @Column
    private double price;
    @Column
    private boolean washingMachine;
    @Column
    private boolean television;
    @Column
    private boolean airConditioner;
    @Column
    private boolean wifi;
    @Column
    private boolean kitchen;
    @Column
    private boolean parking;
    @Column
    private boolean pool;
    @Column
    private boolean hotAndColdMachine;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
    @ManyToOne
    @JoinColumn(name = "location_id")
    private LocationEntity location;
    @OneToMany(mappedBy = "room")
    private List<OrderEntity> orders = new ArrayList<>();
    @OneToMany(mappedBy = "room")
    private List<CommentEntity> comments = new ArrayList<>();
    @OneToMany(mappedBy = "room")
    private List<ImageRoomEntity> images = new ArrayList<>();

}
