"use strict";
import logger from "../utility/logger.utility.js";
import pgsql from "../config/database/database.config.js";
import DB from "../config/app/query.config.js";
import { QueryTypes } from "sequelize";

const RegisterUserDTO = async (name, mobile, email) => {
  try {
    const replacements = {
      name: name ?? null,
      mobile: mobile ?? null,
      email: email ?? null,
    };

    const query = DB.QUERY.INSERT_USER;

    const [rData] = await pgsql.query(query, { replacements, type: QueryTypes.INSERT });
    return rData;
  } catch (error) {
    logger.error({ RegisterUserDTO: error.message });
    throw new Error(error);
  }
};

const GetUserDTO = async (mobile, email, id) => {
  try {
    const replacements = {
      mobile: mobile ?? null,
      email: email ?? null,
      id: id ?? null,
    };

    const query = DB.QUERY.GET_USER;

    const [rData] = await pgsql.query(query, { replacements, type: QueryTypes.INSERT });
    return rData;
  } catch (error) {
    logger.error({ GetUserDTO: error.message });
    throw new Error(error);
  }
};

const CreateChatDTO = async (type) => {
  try {
    const replacements = {
      type: type ?? null,
    };

    const query = DB.QUERY.CREATE_CHAT;

    const [rData] = await pgsql.query(query, { replacements, type: QueryTypes.INSERT });
    return rData;
  } catch (error) {
    logger.error({ CreateChatDTO: error.message });
    throw new Error(error);
  }
};

const CreateChatParticipantsDTO = async (chatId, user1, user2) => {
  try {
    const replacements = {
      chatId: chatId ?? null,
      user1: user1 ?? null,
      user2: user2 ?? null,
    };

    const query = DB.QUERY.CREATE_CHAT_PARTICIPANTS;

    const rData = await pgsql.query(query, { replacements, type: QueryTypes.INSERT });
    return rData;
  } catch (error) {
    logger.error({ CreateChatParticipantsDTO: error.message });
    throw new Error(error);
  }
};

const GetUserChatsDTO = async (user) => {
  try {
    const replacements = {
      user: user ?? null,
    };

    const query = DB.QUERY.GET_CHATS;

    const [rData] = await pgsql.query(query, { replacements, type: QueryTypes.INSERT });
    return rData;
  } catch (error) {
    logger.error({ GetUserChatsDTO: error.message });
    throw new Error(error);
  }
};

const ChatDTO = {
  RegisterUserDTO,
  GetUserChatsDTO,
  CreateChatDTO,
  CreateChatParticipantsDTO,
  GetUserDTO,
};

export default ChatDTO;
