package com.techpower.airbnb.api;
import com.techpower.airbnb.dto.BlogDTO;
import com.techpower.airbnb.service.IBlogService;
import com.techpower.airbnb.service.impl.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/blogs")
public class BlogAPI {
    @Autowired
    private IBlogService iBlogService;
    @Autowired
    private CloudinaryService cloudinaryService;
    @GetMapping("")
    public ResponseEntity<List<BlogDTO>> getAll(){
        List<BlogDTO> result = iBlogService.getAll();
        if(result == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.ok(result);
        }
    }
    @GetMapping("/{idUser}/owner")
    public ResponseEntity<List<BlogDTO>> getByShop(@PathVariable("idUser") long idUser){
        List<BlogDTO> result = iBlogService.getAllByOwner(idUser);
        if(result == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.ok(result);
        }
    }

    @GetMapping("/{idBlog}")
    public ResponseEntity<BlogDTO> getDetail(@PathVariable("idBlog") long idBlog){
        BlogDTO result = iBlogService.getBlogDetail(idBlog);
        if (result ==  null){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else return ResponseEntity.ok(result);
    }
    @PostMapping("/{idUser}")
   public ResponseEntity<BlogDTO> save(@PathVariable("idUser") long idUser,
                                       @RequestParam("title") String title,
                                       @RequestParam("shortDescription") String shortDescription,
                                       @RequestParam("content") String content,
                                       @RequestParam(value = "image",required = false) MultipartFile image){
        BlogDTO blogDTO  = new BlogDTO();
        blogDTO.setTitle(title);
        blogDTO.setContent(content);
        blogDTO.setShortDescription(shortDescription);
        blogDTO.setImage(cloudinaryService.uploadImage(image));
        BlogDTO result = iBlogService.save(blogDTO,idUser);
        if(result == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }else{
            return ResponseEntity.ok(result);
        }
    }
    @PutMapping("/{idBlog}")
    public ResponseEntity<BlogDTO> update(@PathVariable("idBlog") long idBlog,
                                        @RequestParam("title") String title,
                                        @RequestParam("shortDescription") String shortDescription,
                                        @RequestParam("content") String content,
                                        @RequestParam(value = "image",required = false) MultipartFile image){
        BlogDTO blogDTO  = new BlogDTO();
        blogDTO.setId(idBlog);
        blogDTO.setTitle(title);
        blogDTO.setContent(content);
        blogDTO.setShortDescription(shortDescription);
        if (image != null) {
            blogDTO.setImage(cloudinaryService.uploadImage(image));
        }
        BlogDTO result = iBlogService.update(blogDTO);
        if(result == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }else{
            return ResponseEntity.ok(result);
        }
    }
    @DeleteMapping("/{idBlog}")
    public ResponseEntity<List<BlogDTO>> delete(@PathVariable("idBlog")long idBlog){
        List<BlogDTO> result = iBlogService.remove(idBlog);
        if(result == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }else{
            return ResponseEntity.ok(result);
        }
    }
}
