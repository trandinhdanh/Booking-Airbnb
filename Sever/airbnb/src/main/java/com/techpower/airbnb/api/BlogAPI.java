package com.techpower.airbnb.api;

import com.techpower.airbnb.dto.BlogDto;
import com.techpower.airbnb.dto.HouseDTO;
import com.techpower.airbnb.entity.BlogEntity;
import com.techpower.airbnb.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/blogs")
public class BlogAPI {
    @Autowired
    private IBlogService iBlogService;

    @RequestMapping
    private ResponseEntity<List<BlogDto>> findALl() {
        List<BlogDto> blogDtos = iBlogService.findAll();
        if (!blogDtos.isEmpty())
            return ResponseEntity.ok(blogDtos);
        else return ResponseEntity.noContent().build();
    }



}
