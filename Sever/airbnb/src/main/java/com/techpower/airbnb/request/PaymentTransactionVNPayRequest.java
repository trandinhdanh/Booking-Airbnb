package com.techpower.airbnb.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentTransactionVNPayRequest {
    private String amount;
    private String bankCode;
    private String orderInfo;
    private String responseCode;
}
