import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locations = [
  { id: 1, name: "Ho Chi Minh " },
  { id: 2, name: "Ha Noi " },
  { id: 3, name: "Da Nang " },
];

const SelectLocation = () => {
  return (
    <div className="size-full">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-700/70 backdrop-blur-md">
          {locations.map((location, index) => (
            <SelectItem
              key={index}
              value={location.name}
              className="text-white"
            >
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectLocation;
