package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.StatisticalConverter;
import com.techpower.airbnb.dto.StatisticalDTO;
import com.techpower.airbnb.entity.StatisticalEntity;
import com.techpower.airbnb.entity.UserEntity;
import com.techpower.airbnb.repository.StatisticalRepository;
import com.techpower.airbnb.repository.UserRepository;
import com.techpower.airbnb.service.IStatisticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticalService implements IStatisticalService {
    @Autowired
    private StatisticalRepository statisticalRepository;
    @Autowired
    private StatisticalConverter statisticalConverter;
    @Autowired
    private UserRepository userRepository;

    @Override
    public StatisticalDTO getStatisticalByYearAndMonth(long idUser, int year, int month) {
        UserEntity userEntity = userRepository.findOneById(idUser);
        StatisticalEntity statisticalEntity = statisticalRepository.findOneByUserAndYearAndMonth(
                userEntity, year, month
        );
        return statisticalConverter.toDTO(statisticalEntity);
    }

    @Override
    public List<StatisticalDTO> getStatisticalByYear(long idUser, int year) {
        UserEntity userEntity = userRepository.findOneById(idUser);
        List<StatisticalEntity> statisticalEntities = statisticalRepository.findAllByUserAndYear(
                userEntity, year
        );
        List<StatisticalDTO> result = new ArrayList<>();
        for (StatisticalEntity statistical : statisticalEntities) {
            StatisticalDTO statisticalDTO = statisticalConverter.toDTO(statistical);
            result.add(statisticalDTO);
        }
        return result;
    }
}
