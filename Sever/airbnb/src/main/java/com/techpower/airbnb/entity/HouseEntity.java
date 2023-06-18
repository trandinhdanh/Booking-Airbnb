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
@Table(name = "house")
public class HouseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "house_id")
    private Long id;
    @Column
    private String name;
    @Column
    private String description;
//    giá thuê full nhà
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
    @Column(name = "num_living_rooms")
    private int numLivingRooms;
    @Column(name = "num_bathrooms")
    private int numBathrooms;
    @OneToMany(mappedBy = "house")
    private List<RoomEntity> rooms = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "users_id")
    private UserEntity user;
    @ManyToOne
    @JoinColumn(name = "location_id")
    private LocationEntity location;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToMany(mappedBy = "house")
    private List<ImageRoomEntity> images = new ArrayList<>();
}
