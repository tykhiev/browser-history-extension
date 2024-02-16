import { useState, useEffect } from "react";
import { formatTime } from "../service/helper";

type HistoryItem = chrome.history.HistoryItem & { formattedTime: string };
export const useChromeHistorySearch = (
  query: chrome.history.HistoryQuery
): HistoryItem[] => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  useEffect(() => {
    chrome.history
      .search(query)
      .then((chromeHistoryItems) => {
        const formattedHistoryItems = chromeHistoryItems.map((item) => ({
          ...item,
          formattedTime: formatTime(item.lastVisitTime),
        }));
        setHistoryItems(formattedHistoryItems);
      })
      .catch(() => setHistoryItems([]));
  }, [query]);
  return historyItems;
};
