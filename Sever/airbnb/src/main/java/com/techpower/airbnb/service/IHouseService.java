package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.HouseDTO;

import java.util.List;

public interface IHouseService {
    List<HouseDTO> findAll();

    HouseDTO findOneById(long id);

    HouseDTO save(HouseDTO dto, long idUser);

    HouseDTO update(HouseDTO dto);
}
