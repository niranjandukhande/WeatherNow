import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

interface Props {
  coords: Coords;
}

export default function MainWeatherCard({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () =>
      getWeather({ latitude: coords.latitude, longitude: coords.longitude }),
  });
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center text-center gap-4 2xl:justify-between"
    >
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl text-center font-semibold">
          {Math.round(data.main.temp)}°C
        </h2>

        <WeatherIcon src={data.weather[0].icon} className="size-14" />
        <h3 className="text-xl capitalize text-zinc-300">
          {data.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-center">Local time:</p>
        <h3 className="text-4xl font-semibold">
          {new Date((data.dt + data.timezone) * 1000).toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "UTC",
            },
          )}
        </h3>
      </div>

      {/*<p className="text-sm text-zinc-400">
        Feels Like: {Math.round(data.main.feels_like)}°C
      </p>*/}
    </Card>
  );
}
