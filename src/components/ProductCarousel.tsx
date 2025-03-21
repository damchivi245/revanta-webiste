import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full "
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="basis-10/12 lg:basis-1/4">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center px-6 aspect-square">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="md:block hidden" />
      <CarouselNext className="md:block hidden" />
    </Carousel>
  );
}
