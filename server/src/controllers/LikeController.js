const Tweet = require("../models/Tweet");

const store = async (request, response) => {
  const { id } = request.params;
  const tweet = await Tweet.findById(id);

  tweet.set({ likes: tweet.likes + 1 });

  await tweet.save();

  request.io.emit("like", tweet);

  return response.json(tweet);
};

module.exports = {
  store,
};
