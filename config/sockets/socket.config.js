"use strict";

import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import RegisterSocket from "../../sockets/register.socket.js";
import PrivateMessageSocket from "../../sockets/privatechat.socket.js";
import logger from "../../utility/logger.utility.js";
import JwtSocketMiddleWare from "../../sockets/jwt.socket.js";

const InitSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    },
    pingInterval: 20000,
    pingTimeout: 20000,
    transports: ["polling", "websocket"],
  });

  instrument(io, {
    auth: false, // set true in production
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.headers?.token;

      if (!token) {
        return next(new Error("Authentication required"));
      }

      const payload = await JwtSocketMiddleWare.VerifyToken(token);

      if (!payload) {
        return next(new Error("Invalid token"));
      }
      socket.user_id = payload.id;

      logger.info("Socket authenticated:", socket.username);

      next();
    } catch (error) {
      return next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    RegisterSocket(io, socket);
    PrivateMessageSocket(io, socket);
  });

  /* Admin UI connections */
  io.of("/admin").on("connection", (socket) => {
    logger.info("Admin UI connected:", socket.id);
  });
};

export default InitSocket;
