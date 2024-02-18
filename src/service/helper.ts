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
  const days = lastVisitDate.getDate().toString().padStart(2, "0");
  const months = (lastVisitDate.getMonth() + 1).toString().padStart(2, "0");
  const years = lastVisitDate.getFullYear().toString().padStart(2, "0");

  return `${days}/${months}/${years} ${hours}:${minutes}`;
}

export function getFaviconUrl(url: string) {
  return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${url}&size=20`;
}
