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
@Table(name = "feedback")
public class FeedbackEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Long id;
    @Column
    private String content;
    @Column
    private LocalDate createDate;
    @Column
    private int numberOfStars;
    @OneToOne
    @JoinColumn(name = "orders_id")
    private OrderEntity order;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
