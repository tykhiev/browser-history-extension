import React, { useEffect, useState } from "react";
import { useChromeHistorySearch } from "../hook/useChromeHistorySearch";
import { History } from "./History/History";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import moment from "moment";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DashboardProps {}

/**
 * Dashboard component displays the recent history dashboard.
 * It allows users to select a date and view the history items for that date.
 */

export const Dashboard: React.FC<DashboardProps> = () => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const defaultQuery: chrome.history.HistoryQuery = {
    text: "",
    maxResults: 100,
  };
  const [historyQuery, setHistoryQuery] = useState(defaultQuery);

  useEffect(() => {
    setHistoryQuery((historyQuery) => {
      return {
        ...historyQuery,
        startTime: date ? +moment(date).startOf("day").format("x") : undefined,
        endTime: date ? +moment(date).endOf("day").format("x") : undefined,
      };
    });
  }, [date]);

  const historyItems = useChromeHistorySearch(historyQuery);

  return (
    <div className="p-0 w-[40rem] min-h-[30rem]">
      <div className="flex justify-between items-center border-b p-2">
        <h2 className="scroll-m-20 text-2xl font-medium tracking-normal transition-colors first:mt-0 text-zinc-600">
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
                {date ? format(date, "PPP") : <span>Pick a date</span>}
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
      {historyItems.length === 0 ? (
        <p className="text-center p-4">
          No history found on {date?.toLocaleDateString("en-GB")}.
        </p>
      ) : (
        <History items={historyItems} />
      )}
    </div>
  );
};
