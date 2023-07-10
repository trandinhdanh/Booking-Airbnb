package com.techpower.airbnb.api;

import com.techpower.airbnb.service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentAPI {
    //Số thẻ:9704198526191432198
    //Tên chu thẻ:NGUYEN VAN A
    //Ngày phát hành:07/15
    //OTP:123456
    @Autowired
    private IPaymentService iPaymentService;

    @GetMapping("/vnpay")
    public ResponseEntity<?> create(@RequestParam("totalAmount") int totalAmount) throws UnsupportedEncodingException {
        return ResponseEntity.status(HttpStatus.OK).body(iPaymentService.getPaymentVNPay(totalAmount));
    }
}
