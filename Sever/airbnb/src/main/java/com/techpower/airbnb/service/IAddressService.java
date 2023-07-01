package com.techpower.airbnb.service;

import com.techpower.airbnb.dto.AddressDTO;
import com.techpower.airbnb.entity.AddressEntity;

public interface IAddressService {
    AddressDTO addAddress(String address);
}
