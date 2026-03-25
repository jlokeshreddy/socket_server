"use strict";
import jwt from "jsonwebtoken";
import AppConfig from "../config/app/app.config.js";
import logger from "../utility/logger.utility.js";

const { JWT_SECRETKEY_CHAT, JWT_CHAT_EXPIRY, SKIP_AUTH_URL } = AppConfig;

const GenerateToken = async (data) => {
  try {
    const token = jwt.sign(data, JWT_SECRETKEY_CHAT, {
      expiresIn: JWT_CHAT_EXPIRY,
    });
    return token;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};

const VerifyToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRETKEY_CHAT);
    return decodedToken;
  } catch (error) {
    logger.error(error.message);
    throw new Error({ message: "Forbidden You Don't have Access" });
  }
};

const JwtSocketMiddleWare = { GenerateToken, VerifyToken };

export default JwtSocketMiddleWare;
