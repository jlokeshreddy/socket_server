'use strict';

import pino from "pino";
import CustomUtility from "../utility/custom.utility.js"
import AppConfig from "../config/app/app.config.js";


const logger = pino({
  level: AppConfig.LOG_LEVEL ?? 'debug',
  timestamp: () => `,"time": ${CustomUtility.GetSystemTime()}`,
  formatters: {
    level:(label) => {
        return {level: label}
    }
  },
});

export default logger;