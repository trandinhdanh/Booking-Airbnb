package com.techpower.airbnb.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "statistical")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "statistical_id")
    private Long id;
    @Column
    private int year;
    @Column
    private int month;
    @Column
    private double totalRevenue;
    @Column
    private double reallyReceived;
    @ManyToOne
    @JoinColumn(name = "used_id")
    private UserEntity user;

    public StatisticalEntity(UserEntity user) {
        this.user = user;
        this.year = LocalDate.now().getYear();
        this.month = LocalDate.now().getMonthValue();
    }
}
