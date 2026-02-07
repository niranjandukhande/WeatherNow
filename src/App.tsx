import MainWeatherCard from "./components/cards/MainWeatherCard";
import TemperatureDetailsCard from "./components/cards/TemperatureDetailsCard";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";

import { getGeocode } from "./api";
import { useQuery } from "@tanstack/react-query";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";
import MainWeatherCardSkeleton from "./components/skeletons/MainWeatherCardSkeleton";
import TemperatureDetailsCardSkeleton from "./components/skeletons/TemperatureDetail";
import SidePanel from "./components/Sidepanel";
import Hamburger from "/src/assets/hamburger.svg?react";
import MobileHeader from "./components/MobileHeader";
import LightDarkToggle from "./components/LightDarkToggle";

function App() {
  const [coordinates, setCoords] = useState<Coords>({
    latitude: 19.03,
    longitude: 72.85,
  });

  const [location, setLocation] = useState("Mumbai");
  const [mapType, setMapType] = useState("clouds_new");

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

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
    <>
      <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
      <div className="flex flex-col gap-8 pt-4 p-8 xs:pt-8 lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-[1120px]">
        <div className="flex flex-col xs:flex-row xs:gap-8 gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold">Location:</h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold whitespace-nowrap">
              Map Type:
            </h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <div className="ml-auto flex gap-4 items-center">
            <div className="hidden xs:block">
              <LightDarkToggle />
            </div>

            <button
              onClick={() => setIsSidePanelOpen(true)}
              className="hidden xs:block"
            >
              <Hamburger className="size-6 lg:hidden" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 gap-4 2xl:grid-cols-4 2xl:grid-rows-4">
          <div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
            <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
            <MapLegend mapType={mapType} />
          </div>
          <div className="col-span-1 2xl:row-span-2 md:col-span-2 order-2">
            <Suspense fallback={<MainWeatherCardSkeleton />}>
              <MainWeatherCard coords={coords} />
            </Suspense>
          </div>
          {/*<div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
            <Suspense fallback={<MainWeatherCardSkeleton />}>
              <MainWeatherCard coords={coords} />
            </Suspense>
          </div>*/}
          <div className="col-span-1 md:col-span-2 2xl:row-span-2 order-4 2xl:order-3">
            <Suspense fallback={<TemperatureDetailsCardSkeleton />}>
              <TemperatureDetailsCard coords={coords} />
            </Suspense>
          </div>

          {/*<div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
            <Suspense fallback={<TemperatureDetailsCardSkeleton />}>
              <TemperatureDetailsCard coords={coords} />
            </Suspense>
          </div>*/}
        </div>
      </div>
      <SidePanel
        coords={coords}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </>
  );
}

export default App;
