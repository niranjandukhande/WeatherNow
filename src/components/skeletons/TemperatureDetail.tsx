import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function TemperatureDetailsCardSkeleton() {
  return (
    <Card title="Temperature" childrenClassName="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-background rounded-xl p-5 flex flex-col items-center justify-center"
        >
          <Skeleton className="w-15 h-8" />
          <Skeleton className="w-20 h-5 mt-1" />
        </div>
      ))}
    </Card>
  );
}
