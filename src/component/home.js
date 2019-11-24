import React, { useState } from "react";
import axios from "axios";
import "../css/home.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { black } from "@material-ui/core/colors";
import {
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";

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
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black"
    }
  }
})(TextField);

function Home(props) {
  // const [log, setLog] = useState(false);
  // const [user, setU] = useState("");
  // const [pass, setP] = useState("");
  // const [name, setName] = useState({});
  // const loggedin = true;

  // const handelSubmit = e => {
  //   e.preventDefault();
  //   setU(user);
  //   setP(pass);

  //   axiosAuthen
  //     .post("/_api/login", {
  //       username: user,
  //       password: pass
  //     })
  //     .then(res => {
  //       setName(res.data);
  //       console.log(res.data);
  //       setLog(false);
  //       logged = !logged;
  //       document.cookie =
  //         "cookie=" + res.data.cookie + "; expires=" + res.data.exp + ";";
  //       // document.cookie ="cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  //       // getCookie("cookie");
  //     })
  //     .catch(function(err) {});
  // };

  // const test = () => {
  //   logged = !logged;
  //   setLog(logged);
  // };

  return (
    <div>
      <div className="home-nav">
        <div id="logo"></div>
        {/* <div className="login-but" onClick={test}>
          Login {name.name}
        </div>
        {log ? (
          <Paper className="log-contain">
            <form className="login-form" onSubmit={handelSubmit}>
              <div className="i">
                <label>Username: </label>
                <input
                  value={user}
                  onChange={e => setU(e.target.value)}
                ></input>
              </div>
              <div className="i">
                <label>Password: </label>
                <input
                  value={pass}
                  onChange={e => setP(e.target.value)}
                ></input>
              </div>
              <button type="submit" id="login-but">
                Login
              </button>
            </form>
          </Paper>
        ) : (
          <div></div>
        )} */}
      </div>

      <div className="menu-but">
        <div id="name">Live VOD Learning @ KU</div>
        <div id="search-contain">
          <Grid container alignItems="flex-end" justify="center">
            <Grid item>
              <Search />
            </Grid>
            <Grid item>
              <CssTextField label="search" id="search" />
            </Grid>
          </Grid>
        </div>
        <div className="m">
          <Link to="/live">
            <button id="live-but">Live</button>
          </Link>
          <Link to="/course">
            <button id="course-but">Course</button>
          </Link>
          <br />
          <Link to="/goLive">
            <button id="golive-but">Go Live</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
