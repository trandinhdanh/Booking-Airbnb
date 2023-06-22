package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.BlogDto;

import java.util.List;

public interface IBlogService {
    List<BlogDto> findAll();
}
