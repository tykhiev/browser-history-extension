import React, { useEffect, useState } from "react";
import { useChromeHistorySearch } from "../hook/useChromeHistorySearch";
import { useMaxResults } from "../hook/useMaxResults";
import { History } from "./History/History";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const [date, setDate] = React.useState<Date>();
  const defaultQuery: chrome.history.HistoryQuery = {
    text: "",
    maxResults: 100,
  };

  const maxResults = useMaxResults(defaultQuery.maxResults ?? 0);
  const [historyQuery, setHistoryQuery] = useState(defaultQuery);
  const historyItems = useChromeHistorySearch(historyQuery);

  useEffect(() => {
    setHistoryQuery((historyQuery) => {
      return {
        ...historyQuery,
        maxResults,
        startTime: date?.getTime() ?? undefined,
        endTime: date?.getTime()
          ? date?.getTime() + 1000 * 60 * 60 * 24
          : undefined,
      };
    });
  }, [maxResults, date]);

  return (
    <div className="p-0 w-[40rem] min-h-[30rem]">
      <div className="flex justify-between items-center border-b p-2">
        <h2 className="scroll-m-20 text-2xl font-medium tracking-tight transition-colors first:mt-0">
          Recent History Dashboard
        </h2>
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date </span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <History items={historyItems} />
    </div>
  );
};
