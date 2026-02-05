import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords } from "../types";

interface Props {
  coords: Coords;
  onMapClick: (latitude: number, longitude: number) => void;
}

export default function Map({ coords, onMapClick }: Props) {
  const { latitude, longitude } = coords;
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={5}
      style={{ width: "700px", height: "500px" }}
    >
      <MapClick onMapClick={onMapClick} coords={coords} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} />
    </MapContainer>
  );
}

function MapClick({
  onMapClick,
  coords,
}: {
  onMapClick: (latitude: number, longitude: number) => void;
  coords: Coords;
}) {
  const map = useMap();
  map.panTo([coords.latitude, coords.longitude]);

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  });
  return null;
}
