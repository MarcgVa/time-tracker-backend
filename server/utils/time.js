const calculateTimeDifference = (startDate, endDate) => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const diffInMillis = endTime - startTime;

  const seconds = Math.floor(diffInMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  
  return {
    hours: `${hours}.${Math.floor(minutes % 60)}` * 1, //Convert to Float
  };
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