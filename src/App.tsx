import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WeatherCard from "@/components/WeatherCard";
import ForecastRow from "@/components/ForecastRow";
import { Loader } from "lucide-react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export interface WeatherData {
  name: string;
  weather: { main: string; description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const weatherType = weather?.weather[0]?.main || "Default";

  const fetchWeatherByCity = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
        )
      ]);

      if (!weatherRes.ok || !forecastRes.ok) throw new Error("City not found");

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.list.filter((item: any) =>
        item.dt_txt.includes("12:00:00")
      );

      setWeather(weatherData);
      setForecast(dailyForecast.slice(0, 5));
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        )
      ]);

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      const dailyForecast = forecastData.list.filter((item: any) =>
        item.dt_txt.includes("12:00:00")
      );

      setWeather(weatherData);
      setForecast(dailyForecast.slice(0, 5));
      setCity(weatherData.name);
    } catch (err: any) {
      setError("Location fetch failed");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const getBackground = (type: string) => {
    switch (type) {
      case "Clear":
        return "from-blue-100 to-blue-300";
      case "Clouds":
        return "from-gray-300 to-gray-500";
      case "Rain":
        return "from-blue-600 to-gray-800";
      case "Thunderstorm":
        return "from-purple-700 to-gray-900";
      case "Snow":
        return "from-blue-100 to-white";
      case "Mist":
      case "Fog":
        return "from-gray-200 to-gray-400";
      default:
        return "from-blue-100 to-blue-300";
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br ${getBackground(weatherType)} text-black transition-colors`}
    >
      <div className="w-[400px] text-center">
        <h1 className="text-4xl font-bold mb-6">☀️ClimaCast</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!city.trim()) {
              setError("Please type any city.");
              return;
    }
            fetchWeatherByCity(city.trim());
          }}
          className="flex items-center gap-4 mb-6"
        >
          <Input
            className="w-[300px] border border-gray-500 text-black  shadow-sm "
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Button type="submit" className="w-[100px]">
            Search
          </Button>
        </form>

        <Button
          variant="outline"
          className="mb-4"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  //console.log("Location obtained:", latitude, longitude);
                  fetchWeatherByCoords(latitude, longitude);
                },
                (err) => {
                  console.error("Location error:", err.message);
                  setError("Permission denied for location.");
                }
              );
            } else {
              console.error("Geolocation not supported");
              setError("Geolocation not supported.");
            }
          }}
        >
          📍 Use My Location
        </Button>

        {error && <p className="text-red-500">{error}</p>}

        {loading && (
          <div className="flex justify-center items-center h-40">
            <Loader className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}

        {!loading && weather && (
          <>
            <WeatherCard key={weather.name} weather={weather} />
            <ForecastRow key={weather.name + "-forecast"} forecast={forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
