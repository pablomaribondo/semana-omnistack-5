import like from "../like.svg";
import api from "../services/api";
import "./Tweet.css";

const Tweet = (props) => {
  const { tweet } = props;

  const handleLike = async (event) => {
    await api.post(`likes/${tweet._id}`);
  };

  return (
    <li className="tweet">
      <strong>{tweet.author}</strong>
      <p>{tweet.content}</p>
      <button type="button" onClick={handleLike}>
        <img src={like} alt="like" />
        {tweet.likes}
      </button>
    </li>
  );
};

export default Tweet;
