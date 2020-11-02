import { useState, useEffect } from "react";
import socket from "socket.io-client";

import api from "../services/api";
import twitterLogo from "../twitter.svg";
import "./Timeline.css";

import Tweet from "../components/Tweet";

const Timeline = () => {
  const [newTweet, setNewTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    (async () => {
      subscribeToEvents();
      const response = await api.get("tweets");

      setTweets(response.data);
    })();
  }, []);

  const handleInputChange = (event) => {
    setNewTweet(event.target.value);
  };

  const handleNewTweet = async (event) => {
    if (event.keyCode !== 13) {
      return;
    }

    const content = newTweet;
    const author = localStorage.getItem("@GoTwitter:username");

    await api.post("tweets", { content, author });

    setNewTweet("");
  };

  const subscribeToEvents = () => {
    const io = socket("http://localhost:3000");

    io.on("tweet", (data) => {
      setTweets((tweetsState) => [data, ...tweetsState]);
    });

    io.on("like", (data) => {
      setTweets((tweetsState) => {
        let tweetsList = [...tweetsState];
        tweetsList = tweetsList.map((tweet) => {
          return tweet._id === data._id ? data : tweet;
        });
        return tweetsList;
      });
    });
  };

  return (
    <div className="timeline-wrapper">
      <img height={24} src={twitterLogo} alt="GoTwitter" />

      <form>
        <textarea
          value={newTweet}
          onChange={handleInputChange}
          onKeyDown={handleNewTweet}
          placeholder="O que está acontecendo?"
        />
      </form>

      <ul className="tweet-list">
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
