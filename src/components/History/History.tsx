import React from "react";
import styled from "styled-components";
import { HistoryItemType } from "../../types/HistoryItem";
import { HistoryItem } from "./HistoryItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { getFaviconUrl } from "../../service/helper";
import ExpandIcon from "@mui/icons-material/ExpandMore";

interface HistoryProps {
  items: HistoryItemType[];
}

export const History: React.FC<HistoryProps> = ({ items }) => {
  const groupedItems: { [key: string]: HistoryItemType[] } = {};
  items.forEach((item) => {
    const hostname = getHostName(item.url!);
    if (!groupedItems[hostname]) {
      groupedItems[hostname] = [];
    }
    groupedItems[hostname].push(item);
  });

  return (
    <StyledList>
      {Object.keys(groupedItems).map((hostname) => (
        <Accordion key={hostname}>
          <AccordionSummary
            aria-controls={`panel-${hostname}-content`}
            id={`panel-${hostname}-header`}
            expandIcon={<ExpandIcon />}
            aria-expanded={true}
            style={{ flexDirection: "row-reverse" }}
          >
            <div className="flex gap-x-2 min-h-1">
              <img
                src={getFaviconUrl(hostname!)}
                alt={`Favicon of: ${hostname!}`}
                width="20"
                height="18"
                loading="lazy"
              ></img>
              {hostname}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <GroupContent>
              {groupedItems[hostname].map((item, index) => (
                <HistoryItem key={index} item={item} />
              ))}
            </GroupContent>
          </AccordionDetails>
        </Accordion>
      ))}
    </StyledList>
  );
};

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GroupContent = styled.div`
  margin-left: 24px;
`;

// Function to extract hostname from URL
const getHostName = (url: string) => {
  const a = document.createElement("a");
  a.href = url;
  return a.hostname;
};
