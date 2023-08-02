package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.dto.PaymentDTO;
import com.techpower.airbnb.request.PaymentTransactionVNPayRequest;
import com.techpower.airbnb.response.TransactionResponse;

import java.io.UnsupportedEncodingException;

public interface IPaymentService {
    PaymentDTO getPaymentVNPay(OrderDTO orderDTO, long idRoom) throws UnsupportedEncodingException;

    TransactionResponse transaction(long idOrder,PaymentTransactionVNPayRequest request);
}
