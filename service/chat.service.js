"use strict";
import logger from "../utility/logger.utility.js";
import ChatDTO from "../dto/chat.dto.js";
import JwtMiddleWare from "../middlewares/jwt.usermiddleware.js";
import RedisDTO from "../dto/redis.dto.js";
import AppConfig from "../config/app/app.config.js";
import JwtSocketMiddleWare from "../sockets/jwt.socket.js";

const { REDIS_CONFIG } = AppConfig;

const { REDIS_KEYS } = REDIS_CONFIG;

const LoginUserService = async (request) => {
  try {
    const { mobile, email } = request.headers;
    const user = await ChatDTO.GetUserDTO(mobile, email);
    if (user.length === 0) {
      return 401;
    }
    const token = await JwtMiddleWare.GenerateToken(user[0]);
    const chatToken = await JwtSocketMiddleWare.GenerateToken(user[0]);
    return {
      jwt: token,
      chatJwt: chatToken,
      userData: user[0],
    };
  } catch (error) {
    logger.error({ LoginUserService: error.message });
    throw new Error(error.message);
  }
};

const RegisterUserService = async (request) => {
  try {
    const { name, mobile, email } = request.headers;
    const user = await ChatDTO.GetUserDTO(mobile, email);
    if (user.length > 0) {
      return 409;
    }
    const [data] = await ChatDTO.RegisterUserDTO(name, mobile, email);
    await RedisDTO.SAddDTO(REDIS_KEYS.USERS);
    return data;
  } catch (error) {
    logger.error({ RegisterUserService: error.message });
    throw new Error(error.message);
  }
};

const GetUserService = async (request) => {
  try {
    const { mobile, email } = request.headers;

    const data = await ChatDTO.GetUserDTO(mobile, email);
    return data;
  } catch (error) {
    logger.error({ GetUserService: error.message });
    throw new Error(error.message);
  }
};

const CreateChatService = async (request) => {
  try {
    const { type, to } = request.headers;
    const userId = request.id;
    const user = ChatDTO.GetUserDTO(null, null, to);
    if (user.length === 0) {
      return 404;
    }
    const [data] = await ChatDTO.CreateChatDTO(type);
    const result = await ChatDTO.CreateChatParticipantsDTO(data.id, userId, to);
    return result;
  } catch (error) {
    logger.error({ CreateChatService: error.message });
    throw new Error(error.message);
  }
};

const GetUserChatsService = async (request) => {
  try {
    const userId = request.id;
    const result = await ChatDTO.GetUserChatsDTO(userId);
    return result;
  } catch (error) {
    logger.error({ GetUserChatsService: error.message });
    throw new Error(error.message);
  }
};

const ChatService = {
  RegisterUserService,
  GetUserChatsService,
  CreateChatService,
  GetUserService,
  LoginUserService,
};

export default ChatService;
