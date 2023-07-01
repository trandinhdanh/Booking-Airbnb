import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '1400px',
  height: '900px'
};

const center = {
  lat: 10.863392,
  lng: 106.7615546
};

const position = {
  lat: 10.8712817,
  lng: 106.7891814
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

const Map = () => {


  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBzuI2ZxghGGKeoEi5R8asYV1_6hGlF6O0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={options}
      >
        <Marker position={position} icon={icon} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;