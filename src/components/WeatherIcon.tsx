import clsx from "clsx";

interface WeatherIconProps {
  src: string;
  className?: string;
}

export default function WeatherIcon({ src, className }: WeatherIconProps) {
  return (
    <img
      className={clsx("size-8", className)}
      src={`https://openweathermap.org/img/wn/${src}@2x.png`}
      alt="weather icon"
    />
  );
}
