import { LayoutGrid } from "./ui/layout-grid";

export function LayoutGridComponent() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-montserrat md:text-4xl text-xl text-white">
        Powerful Sports Car
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Experience speed and superior performance with high-end sports cars
        featuring aerodynamic design and powerful engines.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-montserrat md:text-4xl text-xl text-white">
        Versatile SUV
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Luxurious, spacious, and comfortable SUVs, perfect for family trips and
        long-distance journeys.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-montserrat md:text-4xl text-xl text-white">
        Modern Electric Car
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Leading the trend with eco-friendly electric cars, energy-efficient and
        packed with advanced technology.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="font-montserrat md:text-4xl text-xl text-white">
        Luxury Car
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        High-end luxury cars with premium interiors, state-of-the-art
        technology, and an exceptional driving experience.
      </p>
    </div>
  );
};
const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: "/pictures/p4.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: "/pictures/p1.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: "/pictures/p3.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: "/pictures/p2.jpg",
  },
];
