import express from "express";
import PingController from "../controller/ping.controller.js";
import ChatController from "../controller/chat.controller.js";
import JwtMiddleWare from "../middlewares/jwt.usermiddleware.js";

const Router = express.Router();

Router.use(JwtMiddleWare.VerifyToken)

Router.get("/ping", PingController);

Router.post("/register", ChatController.RegisterUserController);

Router.post("/login", ChatController.LoginUserController);

Router.get("/user", ChatController.GetUserController);

Router.post("/chat", ChatController.CreateChatController);

Router.get("/chat", ChatController.GetUserChatsController);

export default Router;
