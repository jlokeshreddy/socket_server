"use strict";

import logger from "../utility/logger.utility.js";
import RedisDTO from "../dto/redis.dto.js";
import CustomUtility from "../utility/custom.utility.js";
import AppConfig from "../config/app/app.config.js";
const { REDIS_KEYS } = AppConfig.REDIS_CONFIG;

const { QueueKey } = CustomUtility;

const RegisterSocket = async (io, socket) => {
  try {
    const currentUser = await RedisDTO.SIsMemberDTO(REDIS_KEYS.USERS, socket.user_id);
    if (!currentUser) {
      logger.warn({ PrivateMessageSocket: `need to register before sending the message` });
      socket.emit("message", "need to register before sending the message");
      return;
    }
    await RedisDTO.HSetDTO("online", socket.user_id, socket.id);
    const QueueKeyName = QueueKey(socket.user_id);

    const msgData = {
      user_id: socket.user_id,
      id: socket.id,
      message: "you are sucessfully connected",
    };
    socket.emit("message", msgData);
    const data = await RedisDTO.LRangeALLDTO(QueueKeyName);
    if (data.length > 0) {
      data.map((m) => {
        socket.emit("privatemessage", JSON.parse(m));
      });
      await RedisDTO.DelKeyDTO(QueueKeyName);
    }
  } catch (error) {
    logger.error(`error while processing the user data: ${error.message}`);
    socket.emit("message", `error while processing the user data: ${error.message}`);
  }

  //on disconnect
  socket.on("disconnect", async () => {
    try {
      await RedisDTO.HDelDTO("online", socket.user_id);
      logger.info(`${socket.user_id} disconnected with id ${socket.id}`);
    } catch (error) {
      logger.error({ DisconnectSocket: error.message });
      socket.emit("message", "error occured while disconnected");
    }
  });
};

export default RegisterSocket;
