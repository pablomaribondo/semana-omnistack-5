import { useState } from "react";

import twitterLogo from "../twitter.svg";
import "./Login.css";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const { history } = props;

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.length) {
      return;
    }

    localStorage.setItem("@GoTwitter:username", username);
    history.push("/timeline");
  };

  return (
    <div className="login-wrapper">
      <img src={twitterLogo} alt="GoTwitter" />
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={handleInputChange}
          placeholder="Nome de usuário"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
