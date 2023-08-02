package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.FeedbackDTO;

public interface IFeedbackService {
    FeedbackDTO post(FeedbackDTO dto);
    boolean remove(long idFeedback);
}
