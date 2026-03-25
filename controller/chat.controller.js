"use strict";

import logger from "../utility/logger.utility.js";
import AppConfig from "../config/app/app.config.js";
import ChatService from "../service/chat.service.js";

const { STATUS_MESSAGES } = AppConfig;

const LoginUserController = async (request, response) => {
  try {
    const data = await ChatService.LoginUserService(request);
    if (data === 401) {
      return response.status(401).json({ message: STATUS_MESSAGES[401] });
    }
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ LoginUserController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error.message });
  }
};

const RegisterUserController = async (request, response) => {
  try {
    const data = await ChatService.RegisterUserService(request);
    if (data === 409) {
      return response.status(409).json({ message: STATUS_MESSAGES[409] });
    }
    return response.status(201).json({ message: STATUS_MESSAGES[201] });
  } catch (error) {
    logger.error({ RegisterUserController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error.message });
  }
};

const CreateChatController = async (request, response) => {
  try {
    const data = await ChatService.CreateChatService(request);
    if (data === 404) {
      return response.status(404).json({ message: STATUS_MESSAGES[404] });
    }
    return response.status(201).json({ message: STATUS_MESSAGES[201] });
  } catch (error) {
    logger.error({ CreateChatController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error.message });
  }
};

const GetUserChatsController = async (request, response) => {
  try {
    const data = await ChatService.GetUserChatsService(request);
    if (data === 404) {
      return response.status(404).json({ message: STATUS_MESSAGES[404] });
    }
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetUserChatsController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error.message });
  }
};

const GetUserController = async (request, response) => {
  try {
    const data = await ChatService.GetUserService(request);
    if (data === 404) {
      return response.status(404).json({ message: STATUS_MESSAGES[404] });
    }
    return response.status(200).json({ message: STATUS_MESSAGES[200], data: data });
  } catch (error) {
    logger.error({ GetUserController: error.message });
    return response.status(500).json({ message: STATUS_MESSAGES[500], error: error.message });
  }
};

const ChatController = {
  RegisterUserController,
  GetUserChatsController,
  CreateChatController,
  GetUserController,
  LoginUserController,
};

export default ChatController;
