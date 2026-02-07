import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import type { Coords } from "../../types";

interface Props {
  coords: Coords;
}

export default function TemperatureDetailsCard({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords],
    queryFn: () =>
      getWeather({ latitude: coords.latitude, longitude: coords.longitude }),
  });

  const temps = [
    { label: "Current", value: data.main?.temp },
    { label: "Feels Like", value: data.main?.feels_like },
    { label: "Min", value: data.main?.temp_min },
    { label: "Max", value: data.main?.temp_max },
  ];

  return (
    <Card
      title="Temperature"
      childrenClassName="grid grid-cols-2 gap-4 2xl:justify-between"
    >
      {temps.map((item, index) => (
        <div
          key={index}
          className="bg-background rounded-xl p-5 flex flex-col items-center justify-center"
        >
          <p className="text-2xl font-semibold">{Math.round(item.value)}°C</p>
          <p className="text-sm text-zinc-400 mt-1">{item.label}</p>
        </div>
      ))}
    </Card>
  );
}
