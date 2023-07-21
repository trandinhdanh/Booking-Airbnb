package com.techpower.airbnb.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogDTO {
    private long id;
    private String title;
    private String shortDescription;
    private String content;
    private String image;
}
