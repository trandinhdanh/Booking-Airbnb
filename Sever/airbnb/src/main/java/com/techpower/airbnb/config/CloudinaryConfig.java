package com.techpower.airbnb.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        Cloudinary result = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dtsfnikj0",
                "api_key", "133716951967736",
                "api_secret", "uVcWmvbsTc9f9yx-dVuUdPZCI6g",
                "secure", true
        ));
        return result;
    }
}
