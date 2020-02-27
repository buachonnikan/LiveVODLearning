import React, { useEffect, useState } from "react";
import { BrowserRouter as route, Link } from "react-router-dom";
import "../css/base.css";
import axios from "axios";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Paper, TextField } from "@material-ui/core";
import { ContactSupportOutlined } from "@material-ui/icons";
import { Search } from "@material-ui/icons";
import { black } from "@material-ui/core/colors";
import { Autocomplete } from "@material-ui/lab";
import {
  withStyles,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";

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

const TList = () => {
  const [subject, setSubject] = useState([]);
  const [s, setSearch] = useState("");

  useEffect(() => {
    axios
      .post("/_api/getsubjects", {
        word: ""
      })
      .then(res => {
        setSubject(res.data.subjects);
      })
      .catch(err => {});
  }, []);
  const name = subject.map(data => (
    <Link className="tname" to={"/subject/" + data}>
      <div className="teacher-course">
        <div id="tpic" className="set-center">
          {data[0]}
        </div>
        <div>{data}</div>
      </div>
    </Link>
  ));

  const handleSearch = e => {
    e.preventDefault();
    console.log(subject);
    axios
      .post("/_api/getsubjects", {
        word: s
      })
      .then(res => {
        console.log(res.data.subjects);
        setSubject(res.data.subjects);
      });
  };

  return (
    <div>
      <div>
        <div>
          <div className="content">
            <div className="head-content">
              <div>
                <Link to={{ pathname: "/course", state: { detail: null } }}>
                  <ArrowBackIosIcon className="arrow" />
                </Link>
                <h1 className="subhead" id="s-subhead">
                  รายชื่อรายวิชา
                </h1>
              </div>
            </div>
            <div>
              <form className="search" onSubmit={handleSearch}>
                <div class="s-contain">
                  <Search />
                  <Autocomplete
                    onChange={(event, value) => setSearch(value)}
                    freeSolo
                    id="search"
                    autoSelect={true}
                    options={subject.map(option => option)}
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
              <Paper className="course-paper">
                {/* {name.length > 5 ? (
                  <div className="testt">{name}</div>
                ) : ( */}
                <div>{name}</div>
                {/* )} */}
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TList;
