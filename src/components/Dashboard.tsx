import React, { useEffect, useState } from "react";
import { useChromeHistorySearch } from "../hook/useChromeHistorySearch";
import { useMaxResults } from "../hook/useMaxResults";
import { History } from "./History/History";
import { SearchBar } from "./SearchBar";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = () => {
  const defaultQuery = {
    text: "",
    maxResults: 1000,
  };
  const maxResults = useMaxResults(defaultQuery.maxResults);
  const [historyQuery, setHistoryQuery] = useState(defaultQuery);
  const historyItems = useChromeHistorySearch(historyQuery);

  useEffect(() => {
    setHistoryQuery((historyQuery) => {
      return { ...historyQuery, maxResults };
    });
  }, [maxResults]);

  const onSearchChange = (text: string) => {
    setHistoryQuery((historyQuery) => {
      return {
        ...historyQuery,
        text,
      };
    });
  };

  return (
    <div className="p-0 w-[30rem] max-h-[15rem]">
      <h2 className="scroll-m-20 border-b p-2 text-2xl font-medium tracking-tight transition-colors first:mt-0">
        Recent History Dashboard
      </h2>
      <SearchBar onSearchChange={onSearchChange} />
      {historyItems.length === 0 && (
        <div className="p-4 text-center">
          <p>No recent history found.</p>
        </div>
      )}
      <History items={historyItems} />
    </div>
  );
};
