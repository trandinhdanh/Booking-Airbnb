package com.techpower.airbnb.dto;

import lombok.*;
import java.time.LocalDate;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDTO {
    private long id;
    private String content;
    private LocalDate createDate;
    private int numberOfStars;
    private long idUserCreate;
    private String nameUser;
    private String nameRoom;
    private long idOrder;
}
