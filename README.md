# ☀️ ClimaCast

**ClimaCast** is a modern, desktop-optimized weather application that delivers accurate real-time weather data and 5-day forecasts using the OpenWeatherMap API. Built with scalability and clean design in mind, this app integrates geolocation support, animated UI transitions, responsive components, and a gradient background that adapts to the current weather type. Designed with a developer-first mindset, it is a polished and complete project.

---

## 📦 Product Description

ClimaCast is a fully functional weather forecasting web application that allows users to:

- Search for any city and view real-time weather conditions.
- Get temperature, weather descriptions, feels-like temperature, humidity, and wind speed.
- Use their device's geolocation to instantly fetch local weather.
- See a 5-day forecast in a horizontal scroll layout.
- Enjoy subtle and responsive animations for better user experience.
- Experience automatic UI changes with background gradients based on weather types.

From its clean UI to robust error handling, ClimaCast is built to reflect both practical functionality and visual appeal. This project demonstrates proficiency in frontend engineering, API integration, modern styling techniques, and state management.

---

## 🔑 Key Features

- 🔍 **Search by City:** Users can type a city name to view its current weather and forecast.
- 📍 **Use My Location:** Uses browser geolocation API to fetch weather for the user’s current location.
- 📅 **5-Day Forecast:** Horizontal row with weather conditions at 12:00 PM each day.
- 🌈 **Dynamic Backgrounds:** Weather-based gradient backgrounds (Clear, Clouds, Rain, Thunderstorm, Snow, Fog, etc).
- 🔄 **Loading State:** Animated loader (spinner) shown while fetching data.
- ⚡ **Framer Motion Animations:** Smooth transitions on weather card render.

---

## 🛠️ Tech Stack

| Tech              | Purpose                                           |
|------------------|---------------------------------------------------|
| **React**        | UI Library                                        |
| **TypeScript**   | Static typing for safer and scalable code         |
| **Vite**         | Fast development build tool                       |
| **Tailwind CSS** | Utility-first CSS framework                       |
| **shadcn/ui**    | Prebuilt and themeable UI components              |
| **Framer Motion**| Smooth animation effects                          |
| **OpenWeatherMap API** | Real-time weather and forecast data         |
| **Lucide Icons** | Icon set for loader and button visuals            |

---


## 📌 How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/your-username/climacast.git
```
2. Navigate into the project folder:
```bash
cd climacast
```
3. Install dependencies:
```bash
npm install
```
4. Set up your environment variable:

      Create a .env file and add the API key by getting it from https://openweathermap.org/
```bash
# .env
VITE_WEATHER_API_KEY=your_openweather_api_key_here
```
5. Start the app:
```bash
npm run dev
```


