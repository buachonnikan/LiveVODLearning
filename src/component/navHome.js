import React, { useState, useContext } from "react";
import axios from "axios";
import "../css/base.css";
import { Paper } from "@material-ui/core";
import { LoggedContext } from "../context/LoggedContext";

const NavHome = () => {
  const { isLogged, setLogged, user, setUser } = useContext(LoggedContext);
  const [log, setLog] = useState(false);
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [success, setSuccess] = useState(true);
  const handelSubmit = e => {
    e.preventDefault();
    setU(username);
    setP(password);

    axios
      .post("/_api/login", {
        username: username,
        password: password
      })
      .then(res => {
        setUser({ name: res.data.name, type: res.data.type });
        setLog(false);
        setLogged(true);
        setSuccess(res.data.success);
        document.cookie =
          "cookie=" + res.data.cookie + "; expires=" + res.data.exp + ";";
        // console.log(user.name);
      })
      .catch(function(err) {});
  };

  const clickLogin = () => {
    setLog(!log);
  };
  const clickLogout = () => {
    document.cookie = "cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setLogged(false);
    setU("");
    setP("");
  };

  return (
    <div className="navhome">
      {/* test */}
      {isLogged ? (
        <div className="logged">
          {/* {!success ? <p id="errorLogin">wrong Username or Password</p> : null} */}
          <div className="login-name">{user.name}</div>
          <div className="login-but" onClick={clickLogout}>
            Logout
          </div>
        </div>
      ) : (
        <div className="logged">
          <div className="login-but" onClick={clickLogin}>
            Login
          </div>
        </div>
      )}
      {log ? (
        <div className="log-contain">
          <Paper className="log-box">
            <form className="login-form" onSubmit={handelSubmit}>
              <div className="i">
                <label>Username: </label>
                <input
                  value={username}
                  onChange={e => setU(e.target.value)}
                ></input>
              </div>
              <div className="i">
                <label>Password: </label>
                <input
                  value={password}
                  onChange={e => setP(e.target.value)}
                ></input>
              </div>
              <button type="submit" id="login-but">
                Login
              </button>
            </form>
          </Paper>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NavHome;
