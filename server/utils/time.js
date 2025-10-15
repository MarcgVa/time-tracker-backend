const calculateTimeDifference = (startDate, endDate) => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const diffInMillis = endTime - startTime;

  const seconds = Math.floor(diffInMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const totalSeconds = `${seconds % 60}.${diffInMillis % 1000}`;
  return {
    duration: `${days}:${hours % 24}:${minutes % 60}:${
      Math.round(totalSeconds * 1) / 1
    }`,
  };
};

module.exports = { calculateTimeDifference };