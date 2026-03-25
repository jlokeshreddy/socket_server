"use strict";

import http from "http";
import express from "express";
import InitSocket from "./config/sockets/socket.config.js";
import Router from "./routes/index.route.js";
import logger from "./utility/logger.utility.js";
import redis from "./config/redis/redis.config.js";
import cors from "cors";
import pgsql from "./config/database/database.config.js";
import AppConfig from "./config/app/app.config.js";
import helmet from "helmet";

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use(helmet());

app.use(express.urlencoded({ extended: false }));

const httpServer = http.createServer(app);

InitSocket(httpServer);


app.use(AppConfig.API_PREFIX, Router);

app.use("/", (req, res) => {
  return res.status(404).json({ message: "404 not found" });
});

const RedisConnection = async () => {
  try {
    await redis.client.connect();
    logger.info({ RedisConnection: "redis connected sucessfully" });
  } catch (error) {
    logger.error({ RedisConnection: `error while connecting to redis` });
  }
};

const PgSqlConnection = async () => {
  try {
    await pgsql.authenticate();
    logger.info({ PgSqlConnection: "PgSql connected sucessfully" });
  } catch (error) {
    logger.error({ PgSqlConnection: `error while connecting to PgSql` });
  }
};

RedisConnection();

PgSqlConnection();

httpServer.listen(8080, () => {
  logger.info("server listening on 8080");
});
