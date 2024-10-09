import React from 'react'
import Navbar from './component/Navbar'
import L, { icon } from 'leaflet';

// Example icon import (custom marker)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import MapBox from './component/WeatherBox/MapBox';
import WeatherMain from './component/WeatherBox/W-Main';

const App = () => {
  const position = [25.3176, 83.0254]; // Centered on Varanasi, Uttar Pradesh

  // Custom icon (if needed)
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  return (
    <>
    <WeatherMain />

    <div className='h-screen flex justify-end items-center pl-[600px] w-screen'>
        <img src='image.png' className=' w-[90%] h-[90%]  object-contain' />
    </div>
  </>
  )
}

export default App