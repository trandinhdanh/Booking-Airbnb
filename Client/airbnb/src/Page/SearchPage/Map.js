import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1400px',
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
  console.log("aaaaaaaaaaaaaaaa",address);
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBzuI2ZxghGGKeoEi5R8asYV1_6hGlF6O0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
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