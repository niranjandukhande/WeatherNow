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
      style={{ width: "1000px", height: "500px" }}
    >
      <MapClick onMapClick={onMapClick} />
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
}: {
  onMapClick: (latitude: number, longitude: number) => void;
}) {
  const map = useMap();

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    map.panTo([lat, lng]);
    onMapClick(lat, lng);
  });
  return null;
}
