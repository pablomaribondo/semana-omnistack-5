const { request } = require("express");
const express = require("express");

const routes = express.Router();

const LikeController = require("./controllers/LikeController");
const TweetController = require("./controllers/TweetController");

routes.get("/tweets", TweetController.index);
routes.post("/tweets", TweetController.store);

routes.post("/likes/:id", LikeController.store);

module.exports = routes;
