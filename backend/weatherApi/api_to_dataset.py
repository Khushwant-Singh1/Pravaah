import requests
import pandas as pd

# Define your API key
API_KEY = "9a27b2b21a588e59b219f171c0187088"

# Define the cities and their coordinates
cities = {
    "Rishikesh": {"lat": 30.0869, "lon": 78.2676},
    "Haridwar": {"lat": 29.9457, "lon": 78.1642},
    "Kanpur": {"lat": 26.4499, "lon": 80.3319},
    "Varanasi": {"lat": 25.3176, "lon": 82.9739},
    "Patna": {"lat": 25.5941, "lon": 85.1376},
    "Kolkata": {"lat": 22.5726, "lon": 88.3639},
}

# Function to fetch weather data
def fetch_weather(city_name, lat, lon, api_key):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to get data for {city_name}")
        return None

# Extracting relevant information for the DataFrame
weather_dataset = []

for city, coords in cities.items():
    data = fetch_weather(city, coords["lat"], coords["lon"], API_KEY)
    if data:
        weather_dataset.append({
            "City": city,
            "Temperature (°C)": data['main']['temp'] - 273.15,  # Convert Kelvin to Celsius
            "Feels Like (°C)": data['main']['feels_like'] - 273.15,  # Convert Kelvin to Celsius
            "Min Temperature (°C)": data['main']['temp_min'] - 273.15,  # Convert Kelvin to Celsius
            "Max Temperature (°C)": data['main']['temp_max'] - 273.15,  # Convert Kelvin to Celsius
            "Pressure (hPa)": data['main']['pressure'],
            "Humidity (%)": data['main']['humidity'],
            "Weather": data['weather'][0]['main'],
            "Weather Description": data['weather'][0]['description'],
            "Weather ID": data['weather'][0]['id'],
            "Weather Icon": data['weather'][0]['icon'],
            "Wind Speed (m/s)": data['wind']['speed'],
            "Wind Direction (°)": data['wind']['deg'],
            "Cloudiness (%)": data['clouds']['all'],
            "Visibility (m)": data['visibility'],
            "Sea Level (hPa)": data['main'].get('sea_level'),
            "Ground Level (hPa)": data['main'].get('grnd_level'),
            "Sunrise": data['sys']['sunrise'],
            "Sunset": data['sys']['sunset']
        })

# Convert to DataFrame
df = pd.DataFrame(weather_dataset)

# Display the DataFrame
df.head()
df.to_csv('weather_data.csv', index=False)
