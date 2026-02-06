import MainWeatherCard from "./components/cards/MainWeatherCard";
import TemperatureDetailsCard from "./components/cards/TemperatureDetailsCard";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";

import { getGeocode } from "./api";
import { useQuery } from "@tanstack/react-query";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";

function App() {
  const [coordinates, setCoords] = useState<Coords>({
    latitude: 19.03,
    longitude: 72.85,
  });

  const [location, setLocation] = useState("Mumbai");
  const [mapType, setMapType] = useState("clouds_new");

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
      <div className="flex gap-8">
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Location:</h1>
          <LocationDropdown location={location} setLocation={setLocation} />
        </div>
        <div className="flex gap-4">
          <h1 className="text-2xl font-semibold">Map Type:</h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        </div>
      </div>
      <div className="relative">
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
        <MapLegend mapType={mapType} />
      </div>
      <MainWeatherCard coords={coords} />
      <TemperatureDetailsCard coords={coords} />
    </div>
  );
}

export default App;
