package com.techpower.airbnb.service;

import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.constant.PaymentMethod;
import com.techpower.airbnb.dto.OrderDTO;

public interface IOrderService {
    OrderDTO createOrder(OrderDTO orderDTO, long idRoom);

    OrderDTO updateStatus(Order orderStatus, long idOrder);

    void updatePaymentMethod(PaymentMethod paymentMethod, long idOrder);

    void freeUpdateStatus(Order orderStatus, long idOrder);
}
