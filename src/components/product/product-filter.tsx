import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Filters } from "@/pages/Product/ProductsPage";

const models = [
  { id: 1, name: "LVN" },
  { id: 2, name: "GT" },
  { id: 3, name: "V6" },
  { id: 4, name: "F1" },
];

const brands = [
  { id: 1, name: "Bugatti" },
  { id: 2, name: "Porsche" },
  { id: 3, name: "Mercedes" },
  { id: 4, name: "McLaren" },
  { id: 5, name: "Lamborghini" },
];

const ProductFilter = ({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) => {
  return (
    <div className="relative w-full p-3 space-y-10 overflow-hidden text-white bg-transparent border border-yellow-500 rounded-lg shadow-md backdrop-blur-sm font-montserrat">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-2 bg-yellow-500 rounded-t-lg">
        <h1 className="text-xl font-bold text-center text-black">Filter</h1>
      </div>

      <div className="space-y-3">
        {/* Model Filter */}
        <div>
          <h3 className="font-semibold">Models</h3>
          <RadioGroup
            value={filters.selectedModel}
            onValueChange={(val) =>
              setFilters({ ...filters, selectedModel: val })
            }
          >
            <div className="flex flex-col gap-2">
              {models.map((category) => (
                <div key={category.id} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={category.name}
                    id={category.id.toString()}
                  />
                  <Label htmlFor={category.id.toString()}>
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="h-0.5 bg-yellow-500 opacity-50"></div>

        {/* Brand Filter */}
        <div>
          <h3 className="font-semibold">Brand</h3>
          <RadioGroup
            value={filters.selectedBrand}
            onValueChange={(val) =>
              setFilters({ ...filters, selectedBrand: val })
            }
          >
            <div className="flex flex-col gap-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center gap-2">
                  <RadioGroupItem value={brand.name} id={brand.id.toString()} />
                  <Label htmlFor={brand.id.toString()}>{brand.name}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Clear Filters Button */}
        <Button
          variant="revanta"
          className="flex items-center justify-center w-full"
          onClick={() => setFilters({ selectedModel: "", selectedBrand: "" })}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
