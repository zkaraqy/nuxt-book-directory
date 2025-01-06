export default (dateStr: string) => {
  const date = new Date(dateStr);

  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // To use a 24-hour format, set hour12 to false
  }).format(date);

  return formattedDate;
};
