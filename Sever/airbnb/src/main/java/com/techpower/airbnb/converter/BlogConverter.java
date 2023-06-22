package com.techpower.airbnb.converter;

import com.techpower.airbnb.dto.BlogDto;
import com.techpower.airbnb.entity.BlogEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BlogConverter {
    public BlogEntity toEntity(BlogDto blogDto) {
        return BlogEntity.builder()
                .title(blogDto.getTitle())
                .content(blogDto.getContent())
                .description(blogDto.getDescription())
                .urlImage(blogDto.getUrlImage())
                .build();
    }

    public BlogEntity toEntity(BlogDto blogDto, BlogEntity blogEntity) {
        return blogEntity = BlogEntity.builder()
                .id(blogDto.getId())
                .title(blogDto.getTitle())
                .content(blogDto.getContent())
                .description(blogDto.getDescription())
                .urlImage(blogDto.getUrlImage())
                .build();
    }

    public BlogDto toDTO(BlogEntity blogEntity) {
        return BlogDto.builder()
                .id(blogEntity.getId())
                .title(blogEntity.getTitle())
                .content(blogEntity.getContent())
                .description(blogEntity.getDescription())
                .urlImage(blogEntity.getUrlImage())
                .build();
    }

    public List<BlogDto> toDTOs(List<BlogEntity> blogEntities) {
        List<BlogDto> blogDtos = new ArrayList<>();
        for (BlogEntity blog : blogEntities) {
            blogDtos.add(toDTO(blog));
        }
        return blogDtos;
    }
}
