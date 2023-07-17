package com.techpower.airbnb.api;

import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.request.PaymentTransactionVNPayRequest;
import com.techpower.airbnb.service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/vnpay/{idRoom}")
    public ResponseEntity<?> create(@PathVariable("idRoom") long idRoom,
                                    @RequestBody OrderDTO orderDTO) throws UnsupportedEncodingException {
        return ResponseEntity.status(HttpStatus.OK).body(iPaymentService.getPaymentVNPay(orderDTO, idRoom));
    }

    @GetMapping("/vnpay/transaction")
    public ResponseEntity<?> transaction(@RequestParam("idOrder") long idOrder,
                                         @RequestParam("vnp_Amount") String totalAmount,
                                         @RequestParam("vnp_BankCode") String bankCode,
                                         @RequestParam("vnp_OrderInfo") String orderInfo,
                                         @RequestParam("vnp_ResponseCode") String responseCode
    ) {
        PaymentTransactionVNPayRequest request = PaymentTransactionVNPayRequest.builder()
                .amount(totalAmount)
                .bankCode(bankCode)
                .orderInfo(orderInfo)
                .responseCode(responseCode)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(iPaymentService.transaction(idOrder, request));
    }
}
