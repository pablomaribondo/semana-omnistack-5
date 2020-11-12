const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const uri = process.env.MONGO_ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use((request, response, next) => {
  request.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
