import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

export function TimePicker() {
  const [time, setTime] = React.useState(new Date());
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23
  const minutes = Array.from({ length: 60 }, (_, i) => i); // 0-59

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full" variant={"revanta"} size="sm">
          {format(time, "HH:mm")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex p-4 space-x-2 text-white bg-zinc-700/70 backdrop-blur-md w-fit">
        {/* Scroll chọn giờ */}
        <div className="flex flex-col items-center justify-center gap-1 ">
          <h1>Hours</h1>
          <ScrollArea className="w-16 h-40 p-1 overflow-y-auto border rounded-lg">
            {hours.map((hour) => (
              <Button
                key={hour}
                variant="ghost"
                className="w-full text-sm"
                onClick={() =>
                  setTime((prev) => {
                    const newTime = new Date(prev);
                    newTime.setHours(hour);
                    return newTime;
                  })
                }
              >
                {hour.toString().padStart(2, "0")}
              </Button>
            ))}
          </ScrollArea>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <h1>Minutes</h1>
          {/* Scroll chọn phút */}
          <ScrollArea className="w-16 h-40 p-1 overflow-y-auto border rounded-lg">
            {minutes.map((minute) => (
              <Button
                key={minute}
                variant="ghost"
                className="w-full text-sm"
                onClick={() =>
                  setTime((prev) => {
                    const newTime = new Date(prev);
                    newTime.setMinutes(minute);
                    return newTime;
                  })
                }
              >
                {minute.toString().padStart(2, "0")}
              </Button>
            ))}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
