import { GeocodeSchema } from "./schemas/geocodeSchema";
import { WeatherResponseSchema } from "./schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

type getWeatherInput = {
  latitude: number;
  longitude: number;
};

export async function getWeather({ latitude, longitude }: getWeatherInput) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
  );
  const data = await res.json();
  return WeatherResponseSchema.parse(data);
}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

export async function getGeocode(location: string) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`,
  );
  const data = await res.json();
  return GeocodeSchema.parse(data);
}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
