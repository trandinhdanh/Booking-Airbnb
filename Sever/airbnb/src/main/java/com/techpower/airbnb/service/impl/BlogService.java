package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.converter.BlogConverter;
import com.techpower.airbnb.dto.BlogDTO;
import com.techpower.airbnb.entity.BlogEntity;
import com.techpower.airbnb.entity.UserEntity;
import com.techpower.airbnb.repository.BlogRepository;
import com.techpower.airbnb.repository.UserRepository;
import com.techpower.airbnb.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BlogService implements IBlogService {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private BlogConverter blogConverter;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<BlogDTO> getAll() {
        List<BlogDTO> result = new ArrayList<>();
        for (BlogEntity entity : blogRepository.findAll()) {
            BlogDTO dto = blogConverter.toDTO(entity);
            result.add(dto);
        }
        return result;
    }

    @Override
    public List<BlogDTO> getAllByOwner(long idUser) {
        List<BlogDTO> result = new ArrayList<>();
        for (BlogEntity entity : blogRepository.findAllByUserId(idUser)) {
            BlogDTO dto = blogConverter.toDTO(entity);
            result.add(dto);
        }
        return result;
    }

    @Override
    public BlogDTO getBlogDetail(long idBlog) {
        BlogEntity blogEntity = blogRepository.findOneById(idBlog);
        return blogConverter.toDTO(blogEntity);
    }

    @Override
    public BlogDTO save(BlogDTO blogDTO, long idUser) {
        BlogEntity blogEntity = blogConverter.toEntity(blogDTO);
        blogEntity.setUser(userRepository.findOneById(idUser));
        return blogConverter.toDTO(blogRepository.save(blogEntity));
    }

    @Override
    public BlogDTO update(BlogDTO blogDTO) {
        BlogEntity blogEntityOld = blogRepository.findOneById(blogDTO.getId());
        BlogEntity blogEntityNew = blogConverter.toEntity(blogDTO, blogEntityOld);
        return blogConverter.toDTO(blogRepository.save(blogEntityNew));
    }

    @Override
    public List<BlogDTO> remove(long idBlog) {
        BlogEntity blogEntity = blogRepository.findOneById(idBlog);
        UserEntity userEntity = blogEntity.getUser();
        if (blogEntity != null) {
            blogRepository.deleteById(idBlog);
        }
        return getAllByOwner(userEntity.getId());
    }
}
