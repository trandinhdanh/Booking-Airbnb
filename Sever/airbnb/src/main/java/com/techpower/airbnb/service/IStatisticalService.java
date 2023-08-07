package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.StatisticalDTO;

import java.util.List;

public interface IStatisticalService {
    StatisticalDTO getStatisticalByYearAndMonth(long idUser, int year, int month);
    List<StatisticalDTO> getStatisticalByYear(long idUser, int year);
}
