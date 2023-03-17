const changeTimezone = async () => {
  let date = new Date();
  console.log("Date in India: " + date);
  let usDate = date.toLocaleString("en-US", {
    timeZone: "America/Guatemala",
  });
  console.log("Date in USA: " + usDate, new Date(usDate));
};

module.exports = { changeTimezone };
