import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";

interface MapTypeDropdownProps {
  mapType: string;
  setMapType: Dispatch<SetStateAction<string>>;
}

export default function MapTypeDropdown({
  mapType,
  setMapType,
}: MapTypeDropdownProps) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Location" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        <SelectGroup>
          {/*<SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>*/}
          {types.map((type) => (
            <SelectItem key={type} value={type} className="capitalize">
              {type.split("_")[0]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const types = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
];
