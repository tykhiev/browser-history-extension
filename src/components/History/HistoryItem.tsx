import React from "react";
import { truncateString } from "../../service/helper";
import styled from "styled-components";
import { HistoryItemType } from "../../types/HistoryItem";

interface HistoryItemProps {
  item: HistoryItemType;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const faviconUrl = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${item.url}&size=16`;

  return (
    <a href={item.url} target="_blank" title={item.url}>
      <StyledHistoryItem>
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
        {item.formattedTime}
      </StyledHistoryItem>
    </a>
  );
};

const StyledHistoryItem = styled.li`
  display: flex;
  align-items: center;
  column-gap: 8px;
  min-height: 10px;
  border-radius: 4px;
  cursor: default;
  &:hover {
    background: #fffbef;
    cursor: pointer;
  }
`;
