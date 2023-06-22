package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.BlogConverter;
import com.techpower.airbnb.dto.BlogDto;
import com.techpower.airbnb.entity.BlogEntity;
import com.techpower.airbnb.repository.BlogRepository;
import com.techpower.airbnb.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService implements IBlogService {
    @Autowired
    private BlogConverter blogConverter;
    @Autowired
    private BlogRepository blogRepository;

    @Override
    public List<BlogDto> findAll() {
        List<BlogEntity> blogEntities = blogRepository.findAll();
        return blogConverter.toDTOs(blogEntities);
    }
}
