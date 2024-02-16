import React, { useRef } from "react";
import { HistoryItem } from "./HistoryItem";
import styled from "styled-components";
import { HistoryItemType } from "../../types/HistoryItem";

const MemoizedHistoryItem = React.memo(HistoryItem);

interface HistoryProps {
  items: HistoryItemType[];
}

export const History: React.FC<HistoryProps> = ({ items }) => {
  const listRef = useRef<HTMLUListElement>(null);

  const categorizeItemsByDate = (items: HistoryItemType[]) => {
    const categorizedItems: { [key: string]: HistoryItemType[] } = {};

    items.forEach((item) => {
      const today = new Date();
      const itemDate = new Date(item.lastVisitTime!);
      const diffTime = Math.abs(today.getDate() - itemDate.getDate());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let key;
      if (diffDays === 0) {
        key = "Today";
      } else if (diffDays === 1) {
        key = "Yesterday";
      } else {
        key = itemDate.toLocaleDateString(); // Group by date
      }

      if (!categorizedItems[key]) {
        categorizedItems[key] = [];
      }

      categorizedItems[key].push(item);
    });

    return categorizedItems;
  };

  const categorizedItems = categorizeItemsByDate(items);

  return (
    <StyledList ref={listRef}>
      {Object.entries(categorizedItems).map(([date, items], index) => (
        <React.Fragment key={date}>
          <StyledDateHeader
            className={`sticky-header ${index !== 0 ? "top-header" : ""}`}
          >
            {date}
          </StyledDateHeader>
          {items.map((item) => (
            <MemoizedHistoryItem key={item.id} item={item} />
          ))}
        </React.Fragment>
      ))}
    </StyledList>
  );
};

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledDateHeader = styled.li`
  padding: 0px 10px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;

  &.sticky-header {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
  }

  &.top-header {
    margin-top: 10px;
  }
`;
