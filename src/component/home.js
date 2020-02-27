import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../css/home.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { Grid, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { black } from "@material-ui/core/colors";
import {
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";
import { LoggedContext } from "../context/LoggedContext";
import { Autocomplete } from "@material-ui/lab";

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
  const { isLogged, user } = useContext(LoggedContext);
  const [all, setAll] = useState([]);
  const [s, setSearch] = useState("");
  let history = useHistory();

  useEffect(() => {
    axios
      .get("/_api/getall")
      .then(res => {
        setAll(res.data);
      })
      .catch(err => {});
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    history.push({
      pathname: "/course",
      state: { detail: s }
    });
  };

  return (
    <div>
      <div className="home-nav set-center">{/* <div id="logo"></div> */}</div>
      <div className="home">
        <div className="menu-but set-center">
          <div id="name">Live & VOD Learning @ KU</div>
          <form className="search" id="search-contain" onSubmit={handleSearch}>
            <div class="s-contain">
              <Search />
              <Autocomplete
                onChange={(event, value) => setSearch(value)}
                freeSolo
                id="search"
                autoSelect={true}
                options={all.map(option => option.title)}
                renderInput={params => (
                  <CssTextField
                    {...params}
                    label="search"
                    // id="search"
                    margin="normal"
                  ></CssTextField>
                )}
              />
            </div>
          </form>
          <div className="m">
            <Link to="/live">
              <button id="live-but">Live</button>
            </Link>
            <Link
              to={{
                pathname: "/course",
                state: { detail: null }
              }}
            >
              <button id="course-but">Course</button>
            </Link>
            <br />
            {user.type === "t" && isLogged ? (
              <Link to="/goLive">
                <button id="golive-but">Go Live</button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
