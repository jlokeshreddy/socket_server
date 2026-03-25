"use strict";

import { createClient } from "redis";
import AppConfig from "../app/app.config.js";

const client = createClient({
  url: AppConfig.REDIS_URL,
});

export default {client};
