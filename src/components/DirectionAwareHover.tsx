import { Button } from "./ui/button";
import { DirectionAwareHover } from "./ui/direction-aware-hover";

export function DirectionAwareHoverComponent() {
  const imageUrl = [
    {
      name: "Ho Chi Minh",
      car: "300+ cars",
      url: "/pictures/HoChiMinh.jpg",
    },
    {
      name: "Ha Noi",
      car: "100+ cars",
      url: "/pictures/Hanoi.jpg",
    },
    {
      name: "Da Nang",
      car: "200+ cars",
      url: "/pictures/Danang.jpg",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-full gap-4">
      <h1 className="text-xl text-white md:text-4xl font-cinzel">
        Featured Location
      </h1>
      <div className="flex items-center justify-center gap-4">
        {imageUrl.map((url, index) => (
          <DirectionAwareHover
            key={index}
            imageUrl={url.url}
            imageClassName="rounded-xl"
          >
            <div className="space-y-2">
              {" "}
              <h1 className="text-md md:text-4xl font-cinzel">{url.name}</h1>
              <p className="text-md font-montserrat">{url.car}</p>
              <Button size={"sm"} variant={"revanta"}>
                Rent now
              </Button>
            </div>
          </DirectionAwareHover>
        ))}
      </div>
    </div>
  );
}
