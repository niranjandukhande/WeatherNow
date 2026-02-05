import MainWeatherCard from "./components/cards/MainWeatherCard";
import TemperatureDetailsCard from "./components/cards/TemperatureDetailsCard";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";

function App() {
  const [coords, setCoords] = useState<Coords>({
    latitude: 19.03,
    longitude: 72.85,
  });

  // const { data } = useQuery({
  //   queryKey: ["weather"],
  //   queryFn: () => getWeather({ latitude: 19.03, longitude: 72.85 }),
  // });

  const onMapClick = (latitude: number, longitude: number) => {
    setCoords({ latitude, longitude });
  };

  console.log(coords);

  return (
    <div className="flex flex-col gap-8">
      <Map coords={coords} onMapClick={onMapClick} />
      <MainWeatherCard coords={coords} />
      <TemperatureDetailsCard coords={coords} />
    </div>
  );
}

export default App;
