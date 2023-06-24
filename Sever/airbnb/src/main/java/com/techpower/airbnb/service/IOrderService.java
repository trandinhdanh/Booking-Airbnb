package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.OrderDTO;

public interface IOrderService {
    OrderDTO createOrder(OrderDTO orderDTO);
}
