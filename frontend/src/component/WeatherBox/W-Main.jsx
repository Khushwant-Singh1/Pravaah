import React, { useState } from 'react';
import MapBox from './MapBox';
import WeatherDisplay from './WeatherDisplay';
import Citz from './Citz';
import Summary from './Summary';
import Forecast from './Forecast';

const Main = () => {
  const cities = {
    "Rishikesh": { "lat": 30.097, "lon": 78.3 },
    "Haridwar": { "lat": 29.9457, "lon": 78.1642 },
    "Kanpur": { "lat": 26.4499, "lon": 80.3319 },
    "Varanasi": { "lat": 25.3176, "lon": 82.9739 },
    "Patna": { "lat": 25.5941, "lon": 85.1376 },
    "Kolkata": { "lat": 22.5726, "lon": 88.3639 },
  };

  // State to keep track of the selected city
  const [selectedCity, setSelectedCity] = useState("Haridwar");

  // Function to handle city change, passed down to WeatherDisplay
  const handleCityChange = (newCity) => {
    setSelectedCity(newCity);
  };

  return (
    <div className="bac 0 flex h-[100vh] justify-center overflow-hidden p-2 pt-10 w-full">
      <div className=' absolute text-white/85  text-4xl  top-2'>
          Pravaah - Real time water quality system
      </div>
      <div className='flex flex-col max-w-7xl items-center w-full p-3 relative left-4 -bottom-2'>
        <div className='flex w-full flex-row h-[100vh] gap-8 p-4'>
          {/* Pass city and handler to WeatherDisplay */}
          <WeatherDisplay city={selectedCity} onCityChange={handleCityChange} />
          
          {/* Pass the new position based on the selected city to MapBox */}
          <MapBox position={[cities[selectedCity].lat, cities[selectedCity].lon]} />
          <Citz />
        </div>
        <div className='flex w-full flex-row h-[100vh] gap-8 p-4'>
          <Forecast />
          <Summary />
        </div>
        <div className='flex h-full flex-row'>
          {/* Additional content can go here */}
        </div>
      </div>
    </div>
  );
};

export default Main;
