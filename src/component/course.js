import React, { useEffect, useState } from "react";
import { BrowserRouter as route, Link } from "react-router-dom";
import Navbar from "./nav";
import { Paper, Grid, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import "../css/base.css";
import "../css/responsive.css";
// import "../css/course.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Search, ContactlessOutlined } from "@material-ui/icons";
import { black } from "@material-ui/core/colors";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import SubpaperC from "./subpaperC";
import axios from "axios";

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
const Course = () => {
  const [video, setVideo] = useState([]);
  // const [p1, setP1] = useState(1);
  // const [p2, setP2] = useState(2);
  // const [p3, setP3] = useState(3);
  const [page, setPage] = useState(1);
  const [maxPage, setMax] = useState(1);
  var amount;
  useEffect(() => {
    axios
      .post("/_api/getall", {
        page: 1
      })
      .then(res => {
        setVideo(res.data.videos);
        setMax(res.data.maxpage);
      })
      .catch(err => {});
  }, []);
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
  const handelSubmit = e => {
    e.preventDefault();
    axios
      .post("/_api/getall", {
        page: page
      })
      .then(res => {
        setVideo(res.data.videos);
      });
  };
  const LinkV = video.map(data => "/course-video/" + data._id);
  return (
    <div>
      <div className="none">
        {(amount = Array.from(Array(maxPage), (x, index) => index + 1))}
      </div>
      <div>
        <div>
          <div className="content">
            <div className="head-part">
              <div>
                <Link to="/home">
                  <ArrowBackIosIcon id="arrow" />
                </Link>
                <h1 className="head">COURSE</h1>
              </div>
              <div className="filter nor">
                <Link to="/teacher-list">
                  <button class="filter_but" id="filter_t">
                    อาจารย์ผู้สอน
                  </button>
                </Link>
                <Link to="/subject-list">
                  <button class="filter_but" id="filter_s">
                    รายชื่อวิชา
                  </button>
                </Link>
              </div>
            </div>
            <div>
              <div className="search">
                <div class="s-contain">
                  <Search />
                  <Autocomplete
                    id="search"
                    freeSolo
                    options={video.map(option => option.title)}
                    renderInput={params => (
                      <CssTextField
                        {...params}
                        label="search"
                        id="search"
                        margin="normal"
                      ></CssTextField>
                    )}
                  />
                </div>
              </div>
              <Paper className="course-paper">{Video}</Paper>
            </div>
          </div>
        </div>
      </div>

      {/* <button className="paginat-but set-center">{"<"}</button> */}
      <form onSubmit={handelSubmit} className="paginate">
        {amount.map(i => (
          <button
            className="paginat-but set-center"
            value={i}
            onClick={e => setPage(e.target.value)}
          >
            {i}
          </button>
        ))}
      </form>
      {/* <button className="paginat-but set-center">{">"}</button> */}
    </div>
  );
};

export default Course;
