import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../css/base.css";
import { Paper } from "@material-ui/core";
import user from "./checkType";
import { LoggedContext } from "../context/LoggedContext";

const Userr = user.initt();

const getCookie = cname => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

var axiosAuthen = axios.create({
  headers: { Authorixation: "Bearer " + getCookie("cookie") }
});

let logged = false;

const NavHome = () => {
  const { isLogged } = useContext(LoggedContext);
  const [log, setLog] = useState(false);
  const [user, setU] = useState("");
  const [pass, setP] = useState("");
  const [name, setName] = useState({});
  const loggedin = true;
  useEffect(() => {
    Userr.checkTypeGetName(["t", "s"], false).then(name => setName(name));
  });
  const handelSubmit = e => {
    e.preventDefault();
    setU(user);
    setP(pass);

    axios
      .post("/_api/login", {
        username: user,
        password: pass
      })
      .then(res => {
        setName(res.data);
        console.log(res.data);
        setLog(false);
        logged = !logged;
        document.cookie =
          "cookie=" + res.data.cookie + "; expires=" + res.data.exp + ";";
        console.log(name.name);
      })
      .catch(function(err) {});
  };

  const test = () => {
    logged = !logged;
    setLog(logged);
  };

  return (
    <div>
      <div className="login-but" onClick={test}>
        Login {name.name}
      </div>
      {isLogged ? <p>yay1</p> : <p>yay2</p>}
      {log ? (
        <Paper className="log-contain">
          <form className="login-form" onSubmit={handelSubmit}>
            <div className="i">
              <label>Username: </label>
              <input value={user} onChange={e => setU(e.target.value)}></input>
            </div>
            <div className="i">
              <label>Password: </label>
              <input value={pass} onChange={e => setP(e.target.value)}></input>
            </div>
            <button type="submit" id="login-but">
              Login
            </button>
          </form>
        </Paper>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NavHome;
