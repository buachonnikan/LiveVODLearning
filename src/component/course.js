import React, { useEffect, useState } from "react";
import { BrowserRouter as route, Link, useLocation } from "react-router-dom";
import { Paper, TextField } from "@material-ui/core";
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
const Course = props => {
  const [video, setVideo] = useState([]);
  const [all, setAll] = useState([]);
  const [s, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMax] = useState(1);
  var amount;
  // const test = useLocation.word;
  useEffect(() => {
    // console.log(props.location.state.detail);
    axios
      .post("/_api/getpage", {
        page: 1
      })
      .then(res => {
        setVideo(res.data.videos);
        setMax(res.data.maxpage);
      })
      .catch(err => {});
    if (props.location.state.detail !== undefined) {
      axios
        .post("/_api/getbyword", {
          word: props.location.state.detail
        })
        .then(res => {
          console.log(res.data);
          setVideo(res.data);
        });
    } else {
      axios
        .get("/_api/getall")
        .then(res => {
          setAll(res.data);
        })
        .catch(err => {});
    }
  }, []);
  const Video = video.map(data => (
    <SubpaperC
      title={data.title}
      instructor={data.instructor}
      subject={data.subject}
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
      .post("/_api/getpage", {
        page: page
      })
      .then(res => {
        setVideo(res.data.videos);
      });
  };
  const handleSearch = e => {
    e.preventDefault();
    console.log(s);
    axios
      .post("/_api/getbyword", {
        word: s
      })
      .then(res => {
        console.log(res.data);
        setVideo(res.data);
      });
  };
  return (
    <div>
      <div className="none">
        {(amount = Array.from(Array(maxPage), (x, index) => index + 1))}
      </div>
      <div>
        <div>
          <div className="content">
            <div className="head-part hc">
              <div>
                <Link to="/">
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
              <form className="search" onSubmit={handleSearch}>
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
              <div className="course-content nor">
                <Paper className="course-paper">{Video}</Paper>
              </div>
              <div className="none">
                <div className="r-course-part">
                  {Video}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <button className="paginat-but set-center">{"<"}</button> */}
      <form onSubmit={handelSubmit} className="paginate nor">
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
