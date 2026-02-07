import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function MainWeatherCardSkeleton() {
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center text-center gap-4 2xl:justify-between"
    >
      <div className="flex flex-col gap-2 items-center">
        <Skeleton className="w-50 h-15" />

        <Skeleton className="size-14 rounded-full" />
        <Skeleton className="w-30 h-7" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-center">Local time:</p>
        <Skeleton className="w-30 h-10" />
      </div>
    </Card>
  );
}
