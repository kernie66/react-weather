export const prepareSummary = (
  weatherArray,
  start = 0,
  number = 2
) => {
  let summaryArray = [];
  for (let i = start; i < start + number; i++) {
    summaryArray.push({
      text: weatherArray[i].summary,
      time: weatherArray[i].dt,
    });
  }
  return summaryArray;
};
