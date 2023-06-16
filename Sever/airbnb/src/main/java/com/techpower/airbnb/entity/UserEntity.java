package com.techpower.airbnb.entity;

import com.techpower.airbnb.constant.Role;
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
@Table(name = "user")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String status;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String phone;
    @Column
    private String birthday;
    @Column
    private boolean gender;
    @Column
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "user")
    private List<RoomEntity> rooms = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<OrderEntity> orders = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<CommentEntity> comments = new ArrayList<>();

}
