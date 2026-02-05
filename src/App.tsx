import MainWeatherCard from "./components/cards/MainWeatherCard";
import TemperatureDetailsCard from "./components/cards/TemperatureDetailsCard";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";

import { getGeocode } from "./api";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [coordinates, setCoords] = useState<Coords>({
    latitude: 19.03,
    longitude: 72.85,
  });

  const [location, setLocation] = useState("Mumbai");

  const { data: geoCodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });

  // const { data } = useQuery({
  //   queryKey: ["weather"],
  //   queryFn: () => getWeather({ latitude: 19.03, longitude: 72.85 }),
  // });

  const onMapClick = (latitude: number, longitude: number) => {
    setCoords({ latitude, longitude });
    setLocation("custom");
  };

  const coords =
    location === "custom"
      ? coordinates
      : {
          latitude: geoCodeData?.[0].lat ?? 0,
          longitude: geoCodeData?.[0].lon ?? 0,
        };
  console.log(coords);

  return (
    <div className="flex flex-col gap-8">
      <LocationDropdown location={location} setLocation={setLocation} />
      <Map coords={coords} onMapClick={onMapClick} />
      <MainWeatherCard coords={coords} />
      <TemperatureDetailsCard coords={coords} />
    </div>
  );
}

export default App;
