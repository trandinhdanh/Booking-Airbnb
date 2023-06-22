package com.techpower.airbnb.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "blog")
public class BlogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blog_id")
    private Long id;

    private String title;

    private String content;

    private String description;

    private String urlImage;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
