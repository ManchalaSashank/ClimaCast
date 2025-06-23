import { format } from "date-fns";
import { motion } from "framer-motion";

export default function ForecastRow({ forecast }: { forecast: any[] }) {
  return (
    <motion.div
        className="flex justify-between gap-4 mt-6 px-2"
        initial="hidden"
        animate="visible"
        variants={{
        hidden: {},
        visible: {
            transition: {
            staggerChildren: 0.2
            }
        }
    }}
    >
      
    <div className="flex justify-between gap-4 mt-6 px-2">
      {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = format(date, "EEE");
          const icon = day.weather[0].icon;
          const tempMax = Math.round(day.main.temp_max);
          const tempMin = Math.round(day.main.temp_min);
          
          return (
              <div
              key={index}
              className="flex flex-col items-center p-2 bg-white/80 rounded-md w-[60px] text-sm shadow"
              >
            <span className="font-semibold">{dayName}</span>
            <img
              src={`http://openweathermap.org/img/wn/${icon}.png`}
              alt="icon"
              className="w-10 h-10 bg-blue-100 rounded-full p-1"
              />
            <span>{tempMax}° / {tempMin}°</span>
          </div>
        );
    })}
    </div>
    </motion.div>
  );
}
