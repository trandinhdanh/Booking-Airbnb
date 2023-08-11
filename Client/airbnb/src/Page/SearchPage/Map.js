import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '120%',
  height: '900px'
};


const position = {
  lat:  11.9425783,
  lng: 108.4343696
};
const center = {
  lat:  11.9425783,
  lng: 108.4343696
};

const icon = {
  url: '/img/airbnb.png',
  scaledSize: {
    width: 45,
    height: 45
  },
};

const options = {
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ],
  // mapTypeControlOptions: {
  //   mapTypeIds: ['roadmap', 'hybrid'], // Chỉ hiển thị kiểu bản đồ roadmap và hybrid
  //   style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
  //   position: google.maps.ControlPosition.TOP_LEFT
  // },
};

const Map = ({ address }) => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAuLeNevWVQJMYM7GBtmRa9yXNyP96Cnd8">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: address[0]?.address?.lat, lng: address[0]?.address.lng
        }}
        zoom={14}
        options={options}
      >
        {address?.map((addr, index) => (
          <Marker
            key={index}
            // icon={icon}
            position={{ lat: addr.address.lat, lng: addr.address.lng }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;