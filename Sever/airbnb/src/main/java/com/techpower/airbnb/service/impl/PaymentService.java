package com.techpower.airbnb.service.impl;

import com.techpower.airbnb.config.VNPayConfig;
import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.constant.PaymentMethod;
import com.techpower.airbnb.dto.OrderDTO;
import com.techpower.airbnb.dto.PaymentDTO;
import com.techpower.airbnb.request.PaymentTransactionVNPayRequest;
import com.techpower.airbnb.response.TransactionResponse;
import com.techpower.airbnb.service.IOrderService;
import com.techpower.airbnb.service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class PaymentService implements IPaymentService {
    @Autowired
    private IOrderService iOrderService;

    @Override
    public PaymentDTO getPaymentVNPay(OrderDTO orderDTO, long idRoom) throws UnsupportedEncodingException {
        OrderDTO order = iOrderService.createOrder(orderDTO, idRoom);
        iOrderService.freeUpdateStatus(Order.WAITING_PAYMENT_ONLINE, order.getId());
        iOrderService.updatePaymentMethod(PaymentMethod.VN_PAY, order.getId());

        int amount = (int) Math.round(order.getTotalPrice());
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));

        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = VNPayConfig.getIpAddress();
        String vnp_CreateDate = VNPayConfig.getCreateDate(cld);
        String vnp_ExpireDate = VNPayConfig.getExpireDate(cld, 10);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", VNPayConfig.VERSION);
        vnp_Params.put("vnp_Command", VNPayConfig.COMMAND);
        vnp_Params.put("vnp_TmnCode", VNPayConfig.TMN_CODE);
        vnp_Params.put("vnp_Amount", String.valueOf(amount * 100));
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
        vnp_Params.put("vnp_CurrCode", VNPayConfig.CURR_CODE);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_Locale", VNPayConfig.LOCALE);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", VNPayConfig.ORDER_TYPE);
        vnp_Params.put("vnp_ReturnUrl", VNPayConfig.RETURN_URL);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_BankCode", "NCB");

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {

                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.HASH_SECRET, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.PAY_URL + "?" + queryUrl;
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setIdOrder(order.getId());
        paymentDTO.setUrl(paymentUrl);
        return paymentDTO;
    }

    @Override
    public TransactionResponse transaction(long idOrder, PaymentTransactionVNPayRequest request) {
        TransactionResponse transactionResponse = new TransactionResponse();
        if (request.getResponseCode().equalsIgnoreCase("00")) {
            iOrderService.freeUpdateStatus(Order.BOOKED, idOrder);
            transactionResponse.setStatus("Thanh toán thành công");
        } else {
            transactionResponse.setStatus("Thanh toán thất bại !!!");
        }
        return transactionResponse;
    }
}
