type TruncateOptions = {
  truncateSymbol?: string;
};

export function truncateString(
  value: string,
  maxLength: number,
  options?: TruncateOptions
) {
  options = {
    truncateSymbol: "...",
    ...options,
  };
  const startIndex = 0;
  const endIndex = maxLength;

  return value?.length <= maxLength
    ? value
    : `${value?.substring(startIndex, endIndex)}${options.truncateSymbol}`;
}

export function formatTime(date: number | undefined) {
  const lastVisitDate = new Date(date ?? 0);
  const hours = lastVisitDate.getHours().toString().padStart(2, "0");
  const minutes = lastVisitDate.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
