export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const options: any = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Format date and time
  const formattedDate = date.toLocaleString("en-US", options);

  // Replace commas and format to desired format
  return formattedDate
    .replace(",", "")
    .replace(" ", " ")
    .replace(/\/(\d+)\//, "/$1/");
}
