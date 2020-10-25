const Tweet = require("../models/Tweet");

const index = async (request, response) => {
  const tweets = await Tweet.find({}).sort("-createdAt");

  return response.json(tweets);
};

const store = async (request, response) => {
  const tweet = await Tweet.create(request.body);

  request.io.emit("tweet", tweet);

  return response.json(tweet);
};

module.exports = {
  index,
  store,
};
