import React, { useState, useRef } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin: 10px;
  border-radius: 30px;
  border: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  &:hover {
    box-shadow: 1px 1px 8px 1px #dcdcdc;
  }
  &:focus-within {
    box-shadow: 1px 1px 8px 1px #dcdcdc;
    outline: none;
  }
`;

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  throttleInputMillis?: number;
}

const THROTTLE_INPUT_MILLIS = 500;

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearchChange,
  throttleInputMillis,
}) => {
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [throttled, setThrottled] = useState(false);

  const onChange = () => {
    if (!throttled) {
      setThrottled(true);
      setTimeout(() => {
        setThrottled(false);

        const value = searchInput?.current?.value ?? "";
        onSearchChange(value);
      }, throttleInputMillis ?? THROTTLE_INPUT_MILLIS);
    }
  };

  return (
    <SearchContainer>
      <input
        className="h-9 border-none px-8 flex-1 outline-none text-sm rounded-full"
        type="text"
        ref={searchInput}
        placeholder="Search"
        onChange={onChange}
        // onKeyUp={debounceSearchTerm}
      />
    </SearchContainer>
  );
};
