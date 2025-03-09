import { CheckCircle } from "lucide-react";

const RentalInstructions = () => {
  return (
    <div className="relative h-48 rounded-md bg-zinc-700">
      {/* Danh sách các bước với icon */}
      <div className="absolute grid grid-cols-1 gap-6 text-center inset-10 md:grid-cols-3">
        {[
          "Choose from hundreds of luxury cars at Revanta.",
          "Experience a quick and hassle-free booking process.",
          "Get your car delivered anytime, anywhere.",
        ].map((text, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <CheckCircle className="w-8 h-8 text-yellow-400" />
            <p className="max-w-xs text-lg font-medium text-white">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalInstructions;
