package com.techpower.airbnb.service;

import com.techpower.airbnb.constant.Order;
import com.techpower.airbnb.dto.OrderDTO;

public interface IOrderService {
    OrderDTO createOrder(OrderDTO orderDTO,long idRoom);
    OrderDTO updateStatus(Order orderStatus,long idOrder);
}
