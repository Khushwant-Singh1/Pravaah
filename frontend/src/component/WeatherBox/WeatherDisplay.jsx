import React, { useEffect, useState } from 'react';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Haridwar")
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';


  const cities = {
    "Rishikesh": {"lat": 30.0869, "lon": 78.2676},
    "Haridwar": {"lat": 29.9457, "lon": 78.1642},
    "Kanpur": {"lat": 26.4499, "lon": 80.3319},
    "Varanasi": {"lat": 25.3176, "lon": 82.9739},
    "Patna": {"lat": 25.5941, "lon": 85.1376},
    "Kolkata": {"lat": 22.5726, "lon": 88.3639},
  }

  const cityNames = Object.keys(cities);

  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`${url}/weather?city=${city}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [url,city]);

  

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % cityNames.length;
      setCity(cityNames[currentIndex]);
      console.log(currentIndex);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);
  
  

  return (
    <div className='isolate aspect-video bg-white/20 shadow-lg ring-1 ring-black/10 w-[25%] rounded-2xl '>
      <h3 className='p-3 '>{city}</h3>

      {weatherData && weatherData.weather && weatherData.weather.length > 0 ? (
        <>
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
            alt={weatherData.weather[0].description}
            className='w-[11.65vh] h-[11.65vh] relative top-8 left-5 ' 
          />

          <h1 className='text-4xl relative text-black left-10 bottom-8'>
            {weatherData.main.temp}&deg;C
          </h1>
        </>
      ) : (
        <h1>Loading...</h1>
      )}

      <div className='flex flex-row gap-8 p-1 relative -bottom-8'>
        <img src="https://img.icons8.com/?size=100&id=Nn9CKpExQ3wn&format=png&color=000000" alt="" className='w-10 h-10  '/>
        <img src="https://img.icons8.com/?size=100&id=y9ZLj50ta7xS&format=png&color=000000" alt="" className='w-10 h-10  ' />
        <img src="https://img.icons8.com/?size=100&id=WD34LOxyxWwv&format=png&color=000000" alt="" className='w-10 h-10  ' />
        <img src="https://img.icons8.com/?size=100&id=5tpnFthSXugw&format=png&color=000000" alt="" className='w-10 h-10'/>
      </div>    
    </div>
  );
}

export default WeatherDisplay;
