import { LayoutGrid } from "./ui/layout-grid";

export function LayoutGridComponent() {
  return (
    <div className="w-full h-screen py-8">
      <h1 className="text-3xl text-center text-white font-cinzel">
        Our Premium Car Collection
      </h1>{" "}
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="text-xl text-white font-montserrat md:text-4xl">
        Powerful Sports Car
      </p>
      <p className="max-w-lg my-4 text-base font-normal text-neutral-200">
        Experience speed and superior performance with high-end sports cars
        featuring aerodynamic design and powerful engines.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="text-xl text-white font-montserrat md:text-4xl">
        Versatile SUV
      </p>
      <p className="max-w-lg my-4 text-base font-normal text-neutral-200">
        Luxurious, spacious, and comfortable SUVs, perfect for family trips and
        long-distance journeys.
      </p>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div>
      <p className="text-xl text-white font-montserrat md:text-4xl">
        Modern Electric Car
      </p>
      <p className="max-w-lg my-4 text-base font-normal text-neutral-200">
        Leading the trend with eco-friendly electric cars, energy-efficient and
        packed with advanced technology.
      </p>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div>
      <p className="text-xl text-white font-montserrat md:text-4xl">
        Luxury Car
      </p>
      <p className="max-w-lg my-4 text-base font-normal text-neutral-200">
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
