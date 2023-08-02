package com.techpower.airbnb.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blog")
public class BlogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long id;
    @Column
    private String title;
    @Column
    private String shortDescription;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column
    private String image;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
