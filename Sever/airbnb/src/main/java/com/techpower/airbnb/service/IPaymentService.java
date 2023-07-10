package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.PaymentDTO;
import com.techpower.airbnb.request.PaymentTransactionVNPayRequest;
import com.techpower.airbnb.response.TransactionResponse;

import java.io.UnsupportedEncodingException;

public interface IPaymentService {
    PaymentDTO getPaymentVNPay(int totalAmount) throws UnsupportedEncodingException;

    TransactionResponse transaction(PaymentTransactionVNPayRequest request);
}
