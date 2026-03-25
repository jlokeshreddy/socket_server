"use strict";

const QUERY = {
  INSERT_USER: process.env.INSERT_USER,
  GET_USER: process.env.GET_USER,
  GET_CHATS: process.env.GET_CHATS,
  CREATE_CHAT: process.env.CREATE_CHAT,
  CREATE_CHAT_PARTICIPANTS: process.env.CREATE_CHAT_PARTICIPANTS,
};

const SP = {};

const DB = {
  QUERY,
  SP,
};

export default DB;
