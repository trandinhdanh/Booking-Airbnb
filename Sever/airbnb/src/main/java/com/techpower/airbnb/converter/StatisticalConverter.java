package com.techpower.airbnb.converter;

import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.dto.StatisticalDTO;
import com.techpower.airbnb.entity.OrderEntity;
import com.techpower.airbnb.entity.StatisticalEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StatisticalConverter {
    public StatisticalDTO toDTO(StatisticalEntity entity) {
        StatisticalDTO dto = new StatisticalDTO();
        dto.setYear(entity.getYear());
        dto.setMonth(entity.getMonth());
        dto.setTotalRevenue(entity.getTotalRevenue());
        dto.setReallyReceived(entity.getReallyReceived());
        return dto;
    }
    public List<StatisticalDTO> mapperTOList(List<StatisticalEntity> entity) {
        return entity.stream().map(this::toDTO).toList();
    }

    public StatisticalEntity toEntity(StatisticalDTO dto) {
        StatisticalEntity entity = new StatisticalEntity();
        entity.setYear(dto.getYear());
        entity.setMonth(dto.getMonth());
        entity.setTotalRevenue(dto.getTotalRevenue());
        entity.setReallyReceived(dto.getReallyReceived());
        return entity;
    }
}
