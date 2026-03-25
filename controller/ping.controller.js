"use strict";

import logger from "../utility/logger.utility.js";
import CustomUtility from "../utility/custom.utility.js";
import AppConfig from "../config/app/app.config.js";

const { STATUS_MESSAGES } = AppConfig;

const PingController = (request, response) => {
  const data = {
    status: "UP",
    timestamp: CustomUtility.GetSystemTime(),
  };
  try {
    return response
      .status(200)
      .json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    data.status = "DOWN";
    logger.error({ PingController: error.message });
    return response
      .status(500)
      .json({ message: STATUS_MESSAGES[500], data: data });
  }
};


export default PingController;
