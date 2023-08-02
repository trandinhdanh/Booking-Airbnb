package com.techpower.airbnb.service;

public interface EmailSender {
    void send(String to, String email, String subject);
}
