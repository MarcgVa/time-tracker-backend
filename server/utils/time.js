const calculateTimeDifference = (startDate, endDate) => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const milliseconds = endTime - startTime;

  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((seconds / 60) % 60);
  const hours = Math.floor((minutes / 60) % 60);
  return (
    {hours: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
  );
};



// Week is Sunday through Saturday 
const getFirstDayOfWeek = (d) => {
  d = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day
  return new Date(d.setDate(diff));
};

const getLastDayOfWeek = (d) => {
  d = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day + 6;
  return new Date(d.setDate(diff));
};



module.exports = { calculateTimeDifference, getFirstDayOfWeek, getLastDayOfWeek};