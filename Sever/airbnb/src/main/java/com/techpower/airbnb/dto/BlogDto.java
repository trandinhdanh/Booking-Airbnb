package com.techpower.airbnb.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogDto {
    private Long id;

    private String title;

    private String content;

    private String description;

    private String urlImage;
}
