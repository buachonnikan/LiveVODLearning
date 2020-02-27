import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "./paper";
import "../css/base.css";
import { BrowserRouter as route, Link } from "react-router-dom";
import { Grid, TextField } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Search } from "@material-ui/icons";
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

function Teacher(props) {
  const [subject, setSubject] = useState([]);
  const [video, setVideo] = useState([]);
  const [ss, setSearchS] = useState("");
  const [sv, setSearchV] = useState("");

  useEffect(() => {
    axios
      .post("/_api/getvideobyinstructor", {
        name: props.name,
        word: ""
      })
      .then(res => {
        setVideo(res.data);
      });
    axios
      .post("/_api/getsubjectbyinstructor", {
        name: props.name,
        word: ""
      })
      .then(res => {
        setSubject(res.data);
      });
  }, []);
  const handleSearchS = e => {
    e.preventDefault();
    axios
      .post("/_api/getsubjectbyinstructor", {
        name: props.name,
        word: ss
      })
      .then(res => {
        console.log("s");
        console.log(res.data);
        setSubject(res.data);
      });
  };
  const handleSearchV = e => {
    e.preventDefault();
    axios
      .post("/_api/getvideobyinstructor", {
        name: props.name,
        word: sv
      })
      .then(res => {
        console.log("v");
        console.log(res.data);
        setVideo(res.data);
      });
  };

  return (
    <div>
      <div className="content">
        <div className="head-content">
          <div className="head-part">
            {/* <Link to={{ pathname: "/course", state: { detail: null } }}> */}
            <Link to={"/teacher-list"}>
              <ArrowBackIosIcon className="arrow" />
            </Link>
            <div id="Tpic"></div>
            <h1 className="name-sub">{props.name}</h1>
          </div>
        </div>
        <div>
          <div className="live-part">
            <div>
              <form className="search" onSubmit={handleSearchS}>
                <div class="s-contain">
                  <Search />
                  <Autocomplete
                    onChange={(event, value) => setSearchS(value)}
                    freeSolo
                    id="search-sep"
                    autoSelect={true}
                    options={subject.map(option => option)}
                    renderInput={params => (
                      <CssTextField
                        {...params}
                        label="search"
                        id="search-s"
                        margin="normal"
                      ></CssTextField>
                    )}
                  />
                </div>
              </form>
              <Paper
                live={subject}
                head="รายวิชาที่เปิดสอน"
                type="sc"
                className="paper-size"
              />
            </div>
            <div>
              <form className="search" onSubmit={handleSearchV}>
                <div class="s-contain">
                  <Search />
                  <Autocomplete
                    onChange={(event, value) => setSearchV(value)}
                    freeSolo
                    id="search-sep-v"
                    autoSelect={true}
                    options={video.map(option => option.title)}
                    renderInput={params => (
                      <CssTextField
                        {...params}
                        label="search"
                        id="search-v"
                        margin="normal"
                      ></CssTextField>
                    )}
                  />
                </div>
              </form>
              <Paper live={video} head="วิดิโอทั้งหมด" className="paper-size" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teacher;
