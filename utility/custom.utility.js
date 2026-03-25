'use strict';

const GetSystemTime = () => {
  const now = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return Intl.DateTimeFormat("en-IN", options).format(now);
};

const GenerateRandomString = (length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
const QueueKey = (username) => `msg_queue:${username}`;

const CustomUtility = {
  GetSystemTime,
  GenerateRandomString,
  QueueKey,
};

export default CustomUtility;
