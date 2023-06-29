package com.techpower.airbnb.service.impl;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Test {
    public static void main(String[] args) {
        long daysBetween = ChronoUnit.DAYS.between(LocalDate.of(2023, 7, 1), LocalDate.of(2023, 7, 1));
        System.out.println(Math.abs((int) daysBetween));
    }
}
