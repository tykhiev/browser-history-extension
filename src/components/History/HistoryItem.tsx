import React from "react";
import { truncateString } from "../../service/helper";
import { HistoryItemType } from "../../types/HistoryItem";
import { formatTime } from "../../service/helper";

interface HistoryItemProps {
  item: HistoryItemType;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const faviconUrl = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.url}&size=16`;

  return (
    <a href={item.url} target="_blank" title={item.url}>
      <li className="flex items-center gap-2 min-h-[10px] rounded-md  hover:bg-fffbef hover:cursor-pointer">
        <img
          src={faviconUrl}
          alt={`Favicon of: ${item.url}`}
          width="16"
          height="16"
          loading="lazy"
        ></img>
        <div className="flex-1 flex-wrap gap-y-1 p-1">
          <span className="text-black w-full text-sm font-normal">
            {truncateString(item.title ?? "", 50)}
          </span>
          <br />
          <a
            className="text-gray-500 no-underline text-xs"
            href={item.url}
            target="_blank"
            title={item.url}
          >
            {truncateString(item.url!, 40)}
          </a>
        </div>
        {item.formattedTime && (
          <span className="text-gray-500 text-xs font-normal">
            {formatTime(item.lastVisitTime)}
          </span>
        )}
      </li>
    </a>
  );
};
