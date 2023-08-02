package com.techpower.airbnb.service;


import com.techpower.airbnb.dto.BlogDTO;

import java.util.List;

public interface IBlogService {
    public List<BlogDTO> getAll();

    public List<BlogDTO> getAllByOwner(long idUser);

    public BlogDTO getBlogDetail(long idBlog);

    public BlogDTO save(BlogDTO blogDTO, long idUser);

    public BlogDTO update(BlogDTO blogDTO);

    public List<BlogDTO> remove(long idBlog);

}
