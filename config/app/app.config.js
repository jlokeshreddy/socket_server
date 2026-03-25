"use strict";

import dotenv from "dotenv";

dotenv.config();

const STATUS_MESSAGES = {
  200: "OK - Request successful.",
  201: "Created - Resource added successfully.",
  400: "Bad Request - Invalid request format.",
  401: "Unauthorized - Authentication required.",
  403: "Forbidden - Access denied.",
  404: "Not Found - Resource not available.",
  409: "Conflict - Request conflicts with current state.",
  415: "Unsupported Media Type - Format not supported.",
  422: "Unprocessable Entity - Validation failed.",
  500: "Internal Server Error - Server issue.",
  503: "Service Unavailable - Server overloaded or down.",
};

const REDIS_CONFIG = {
  REDIS_KEYS: {
    USERS: "users",
    ONLINE: "online",
  },
};

const SkipAuthURL = ["/api/v1/register", "/api/v1/login", "/api/v1/ping"];

const AppConfig = {
  STATUS_MESSAGES,
  REDIS_URL: process.env.REDIS_URL,
  LOG_LEVEL: process.env.LOG_LEVEL,
  REDIS_CONFIG: REDIS_CONFIG,
  JWT_USER_EXPIRY: process.env.JWT_USER_EXPIRY,
  JWT_SECRETKEY_USER: process.env.JWT_SECRETKEY_USER,
  JWT_CHAT_EXPIRY: process.env.JWT_CHAT_EXPIRY,
  JWT_SECRETKEY_CHAT: process.env.JWT_SECRETKEY_CHAT,
  API_PREFIX: process.env.API_PREFIX,
  SKIP_AUTH_URL: SkipAuthURL,
};

export default AppConfig;
