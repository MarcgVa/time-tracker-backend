const calculateTimeDifference = (startDate, endDate) => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const milliseconds = endTime - startTime;

  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((seconds / 60) % 60);
  const hours = Math.floor((minutes / 60) % 60);
  return {
    hours: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`,
  };
};

// Week is Sunday through Saturday
const getFirstDayOfWeek = (d) => {
  d = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

const getLastDayOfWeek = (d) => {
  d = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day + 6;
  return new Date(d.setDate(diff));
};

const getTotalLoggedTime = (items) => {
  let totalSeconds = 0;

  items.forEach((element) => {
    //hours is written as a string '01:00:00'
    time = element.hours.split(":");

    const sec =
      Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2]);

    totalSeconds += sec;
  });

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = Math.floor(totalSeconds % 60);

  return (
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`
  );
};

const getEntryTotalTime = (entry) => {
  
  const time = entry.hours.split(":");
  const totalSeconds =
    Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2]);

  const totalHours = (totalSeconds / 3600).toFixed(2);

  return totalHours * 1 ;
};

module.exports = {
  calculateTimeDifference,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getTotalLoggedTime,
  getEntryTotalTime,
};
