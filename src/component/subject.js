import React, { useState, useEffect } from "react";
import axios from "axios";
import SubpaperC from "./subpaperC";
import "../css/base.css";
import { BrowserRouter as route, Link } from "react-router-dom";
import { Paper, TextField } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Autocomplete } from "@material-ui/lab";
import { Search } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

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

function Subject(props) {
  const [video, setVideo] = useState([]);
  const [s, setSearch] = useState("");
  useEffect(() => {
    axios
      .post("/_api/getvideobysubject", {
        subject: props.name,
        word: ""
      })
      .then(res => {
        setVideo(res.data);
      })
      .catch(function(err) {});
  }, [props.name]);

  const handleSearch = e => {
    e.preventDefault();

    axios
      .post("/_api/getvideobysubject", {
        subject: props.name,
        word: s
      })
      .then(res => {
        setVideo(res.data);
      });
  };
  const Video = video.map(data => (
    <SubpaperC
      title={data.title}
      instructor={data.instructor}
      time={data.dateTime}
      key={data._id}
      id={data._id}
      rtmp={data.rtmp}
      back="/course"
      go="/course-video/"
    />
  ));
  return (
    <div className="content">
      <div className="head-content">
        <Link to={"/subject-list"}>
          <ArrowBackIosIcon id="arrow" />
        </Link>
        <h1 className="name-sub">{props.name}</h1>
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
              options={video.map(option => option.title)}
              renderInput={params => (
                <CssTextField
                  {...params}
                  label="search"
                  margin="normal"
                ></CssTextField>
              )}
            />
          </div>
        </form>
        <div className="course-content">
          <Paper className="course-paper">{Video}</Paper>
        </div>
      </div>
    </div>
  );
}
export default Subject;
