package com.techpower.airbnb.service;

public interface EmailSender {
    void send(String to, String email);
     void sendOrder(String to, String html);
}
