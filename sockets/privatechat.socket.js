"use strict";
import logger from "../utility/logger.utility.js";
import AppConfig from "../config/app/app.config.js";
import RedisDTO from "../dto/redis.dto.js";
import CustomUtility from "../utility/custom.utility.js";

const { QueueKey, GetSystemTime } = CustomUtility;

const { REDIS_KEYS } = AppConfig.REDIS_CONFIG;

const PrivateMessageSocket = (io, socket) => {
  //on message
  socket.on("privatemessage", async (data) => {
    try {
      //const currentUser = await RedisDTO.SIsMemberDTO(REDIS_KEYS.USERS, socket.user_id);
      if (!socket?.user_id) {
        logger.warn({
          PrivateMessageSocket: `need to register before sending the message`,
        });
        socket.emit("message", "need to register before sending the message");
        return;
      }
      let rawData = typeof data === "object" ? data : JSON.parse(data);
      if (!rawData && !rawData.to) {
        logger.warn({ PrivateMessageSocket: `username is required` });
        socket.emit("message", "username is required");
        return;
      }
      const toid = await RedisDTO.HGetDTO(REDIS_KEYS.ONLINE, rawData.to);
      const toUser = await RedisDTO.SIsMemberDTO(REDIS_KEYS.USERS,rawData.to);
      if (!toUser) {
        logger.warn({ PrivateMessageSocket: `to user not avilable` });
        socket.emit("message", "user not avilable");
        return;
      }

      const s = io.sockets.sockets.get(toid);
      const isDisconnected = s && s.connected ? false : true;
      if (isDisconnected) {
        await RedisDTO.HDelDTO("online", rawData.to);
        const messageData = {
          to: rawData.to,
          from: socket.user_id,
          message: rawData.message,
          datetime: GetSystemTime(),
        };
        //   queueMessages.push(messageData);
        let toUserName = QueueKey(rawData.to);
        await RedisDTO.RPushDTO(toUserName, JSON.stringify(messageData));
        logger.warn({ PrivateMessageSocket: `message not sent user offline` });
        socket.emit("message", "message sent to user");
        return;
      }

      const message = {
        message: rawData.message,
      };

      socket.to(toid).emit("privatemessage", message);
      socket.emit("privatemessage", "message sent sucessfully");
    } catch (error) {
      logger.error({ RegisterSocket: error.message });
      socket.emit("message", "error occured while sending the message");
    }
  });
};

export default PrivateMessageSocket;
