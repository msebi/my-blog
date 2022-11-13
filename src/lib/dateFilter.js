export const dateFilter = (value) => {
  const dateObject = new Date(value);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayWithSuffix = dateObject.getDate();

  return `${dayWithSuffix} ${
    months[dateObject.getMonth()]
  }, ${dateObject.getFullYear()}`;
};
