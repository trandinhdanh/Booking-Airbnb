package com.techpower.airbnb.service.impl;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class GeocodingService {

    @Value("${google.maps.api.key}")
    private String apiKey;

    public LatLng getLatLngFromAddress(String address) throws ApiException, InterruptedException, IOException {
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();
        GeocodingResult[] results = GeocodingApi.geocode(context, address).await();
        if (results.length > 0) {
            LatLng latLng = results[0].geometry.location;
            return latLng;
        } else {
            return null;
        }
    }
}