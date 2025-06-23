import type { WeatherData } from "@/App";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind } from "lucide-react";

export default function WeatherCard({ weather }: { weather: WeatherData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white text-black p-6 rounded-lg shadow-lg w-full text-center transition-colors"
    >
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        className="mx-auto my-2"
      />
      <p className="text-3xl font-semibold">{weather.main.temp}°C</p>

      <div className="grid grid-cols-3 gap-4 mt-6 text-sm text-gray-700">
        <div className="flex flex-col items-center">
          <Thermometer className="h-5 w-5 mb-1 text-blue-600" />
          <p className="font-medium">Feels Like</p>
          <p>{weather.main.feels_like}°C</p>
        </div>
        <div className="flex flex-col items-center">
          <Droplets className="h-5 w-5 mb-1 text-blue-600" />
          <p className="font-medium">Humidity</p>
          <p>{weather.main.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <Wind className="h-5 w-5 mb-1 text-blue-600" />
          <p className="font-medium">Wind</p>
          <p>{weather.wind.speed} m/s</p>
        </div>
      </div>
    </motion.div>
  );
}
